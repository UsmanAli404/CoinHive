import WebSocket from "ws";
import axios from "axios";





let validSymbolsCache = [];

const fetchValidBinanceSymbols = async () => {
  if (validSymbolsCache.length) return validSymbolsCache;

  const res = await axios.get('https://api1.binance.com/api/v3/exchangeInfo');
  validSymbolsCache = res.data.symbols.map(s => s.symbol);
  return validSymbolsCache;
};

export const getMarketData = async (req, res) => {
  try {
    const { symbol = 'BTCUSDT', interval = '1h', limit = 100 } = req.body;
    const validSymbols = await fetchValidBinanceSymbols();

    if (!validSymbols.includes(symbol)) {
      return res.status(400).json({ error: 'Invalid or unsupported symbol for Binance' });
    }

    const response = await axios.get('https://api1.binance.com/api/v3/klines', {
      params: { symbol, interval, limit },
    });

    const formatted = response.data.map(c => ({
      time: c[0],
      open: parseFloat(c[1]),
      high: parseFloat(c[2]),
      low: parseFloat(c[3]),
      close: parseFloat(c[4]),
      volume: parseFloat(c[5]),
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching market data:', error.message);
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
};






export const getCoins = async (req, res) => {
  try {
    const {
      vs_currency = 'usd',
      order = 'market_cap_desc',
      per_page = 10,
      page = 1,
      sparkline = false
    } = req.body;

    const pairSuffix = vs_currency.toUpperCase() === 'USD' ? 'USDT' : vs_currency.toUpperCase();

    const { data: tickers } = await axios.get('https://api.binance.com/api/v3/ticker/24hr');

    const usdtPairs = tickers.filter(ticker => ticker.symbol.endsWith(pairSuffix));

    const enriched = usdtPairs.map(ticker => {
      const price = parseFloat(ticker.lastPrice);
      const quoteVolume = parseFloat(ticker.quoteVolume);
      return {
        name: ticker.symbol.replace(pairSuffix, ''),
        symbol: ticker.symbol,
        price,
        volume: quoteVolume,
        marketCap: price * quoteVolume,
        change_24h: parseFloat(ticker.priceChangePercent)
      };
    });

    if (order === 'market_cap_desc') {
      enriched.sort((a, b) => b.marketCap - a.marketCap);
    }

    const start = (page - 1) * per_page;
    const paginated = enriched.slice(start, start + per_page);

    const formatted = paginated.map(coin => ({
      name: coin.name,
      symbol: coin.symbol,
      price: `$${coin.price.toLocaleString()}`,
      market_cap: `$${coin.marketCap.toLocaleString()}`,
      volume: `$${coin.volume.toLocaleString()}`,
      change_24h: `${coin.change_24h.toFixed(2)}%`
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching coins:', error.message);
    res.status(500).json({ error: 'Failed to fetch coins' });
  }
};



export const getAllCoins = async (req, res) => {
  try {
    const url = "https://api.binance.com/api/v3/exchangeInfo";

    const { data } = await axios.get(url);

    const uniqueCoins = new Set();
    data.symbols.forEach(({ baseAsset, quoteAsset }) => {
      uniqueCoins.add(baseAsset);
      uniqueCoins.add(quoteAsset);
    });

    const formatted = Array.from(uniqueCoins).sort().map(coin => ({
      symbol: coin
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching Binance coins:", error.message);
    res.status(500).json({ error: "Failed to fetch Binance coin list" });
  }
};

export const getActivityData = async (req, res) => {
  try {
    const ids = req.body.ids || ['bitcoin', 'ethereum', 'solana'];

    const url = `https://api.coingecko.com/api/v3/coins/markets`;
    const params = {
      vs_currency: 'usd',
      ids: ids.join(','),
      order: 'market_cap_desc',
      per_page: ids.length,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h'
    };

    const { data } = await axios.get(url, { params });

    const formatted = data.map(coin => ({
      name: coin.name,
      symbol: `${coin.symbol.toUpperCase()}USDT`,
      price: `$${coin.current_price.toLocaleString()}`,
      updated: coin.last_updated,
      change: `${coin.price_change_percentage_24h.toFixed(2)}%`
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching activity data:', error.message);
    res.status(500).json({ error: 'Failed to fetch activity data' });
  }
};
