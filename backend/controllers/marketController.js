import axios from 'axios';

export const getMarketData = async (req, res) => {
  try {
    const { symbol = 'BTCUSDT', interval = '1h', limit = 100 } = req.body;

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


export const streamMarketData = (ws) => {
  setInterval(async () => {
    try {
      const { symbol = 'BTCUSDT', interval = '1h', limit = 100 } = { symbol: 'BTCUSDT', interval: '1h', limit: 100 }; // Default params

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

      ws.send(JSON.stringify(formatted));
    } catch (error) {
      console.error('Error fetching market data:', error.message);
    }
  }, 5000);
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

    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
      vs_currency,
      order,
      per_page,
      page,
      sparkline,
      price_change_percentage: '24h'
    };

    const { data } = await axios.get(url, { params });

    const formatted = data.map(coin => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: `$${coin.current_price.toLocaleString()}`,
      market_cap: `$${coin.market_cap.toLocaleString()}`,
      volume: `$${coin.total_volume.toLocaleString()}`,
      change_24h: `${coin.price_change_percentage_24h?.toFixed(2)}%`
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
