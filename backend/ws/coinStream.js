import axios from "axios";

export const handleCoinMetricsSocket = (ws) => {
  console.log("New coin metrics WebSocket connection");

  let streamParams = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 10,
    page: 1,
    refresh: 5000
  };

  let intervalId = streamCoinMetrics(ws, streamParams);

  ws.on("message", (msg) => {
    try {
      const data = JSON.parse(msg);
      const { vs_currency, order, per_page, page, refresh } = data;

      if (refresh && (typeof refresh !== 'number' || refresh < 1000)) {
        return ws.send(JSON.stringify({ error: "Invalid refresh interval (min: 1000ms)" }));
      }

      streamParams = {
        vs_currency: vs_currency?.toLowerCase() || streamParams.vs_currency,
        order: order || streamParams.order,
        per_page: per_page || streamParams.per_page,
        page: page || streamParams.page,
        refresh: refresh || streamParams.refresh
      };

      clearInterval(intervalId);
      intervalId = streamCoinMetrics(ws, streamParams);
    } catch (err) {
      console.error("Error parsing WebSocket message:", err.message);
    }
  });

  ws.on("close", () => {
    console.log("Coin metrics WebSocket connection closed");
    clearInterval(intervalId);
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err.message);
  });
};

export const streamCoinMetrics = (ws, { vs_currency, order, per_page, page, refresh }) => {
  return setInterval(async () => {
    try {
      const pairSuffix = vs_currency.toUpperCase() === 'USD' ? 'USDT' : vs_currency.toUpperCase();
      const { data: tickers } = await axios.get('https://api.binance.com/api/v3/ticker/24hr');
      const filtered = tickers.filter(t => t.symbol.endsWith(pairSuffix));

      const enriched = filtered.map(t => {
        const price = parseFloat(t.lastPrice);
        const volume = parseFloat(t.quoteVolume);
        return {
          name: t.symbol.replace(pairSuffix, ''),
          symbol: t.symbol,
          price,
          volume,
          marketCap: price * volume,
          change_24h: parseFloat(t.priceChangePercent)
        };
      });

      if (order === 'market_cap_desc') {
        enriched.sort((a, b) => b.marketCap - a.marketCap);
      }

      const start = (page - 1) * per_page;
      const paginated = enriched.slice(start, start + per_page);

      const formatted = paginated.map(c => ({
        name: c.name,
        symbol: c.symbol,
        price: `$${c.price.toLocaleString()}`,
        market_cap: `$${c.marketCap.toLocaleString()}`,
        volume: `$${c.volume.toLocaleString()}`,
        change_24h: `${c.change_24h.toFixed(2)}%`
      }));

      ws.send(JSON.stringify({ type: 'coinMetrics', data: formatted }));
    } catch (err) {
      console.error("Coin metrics fetch error:", err.message);
      ws.send(JSON.stringify({ error: "Failed to fetch coin metrics" }));
    }
  }, refresh);
};