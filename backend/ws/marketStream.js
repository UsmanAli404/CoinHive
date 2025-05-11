import axios from "axios";
import WebSocket from "ws";

const VALID_INTERVALS = ["1m", "5m", "15m", "1h", "4h", "1d"];
let symbolCache = null;

const validateSymbol = async (symbol) => {
  try {
    if (!symbolCache) {
      const { data } = await axios.get(
        "https://api1.binance.com/api/v3/exchangeInfo"
      );
      symbolCache = data.symbols.map((s) => s.symbol.toUpperCase());
    }
    return symbolCache.includes(symbol.toUpperCase());
  } catch (err) {
    console.error("Validation failed:", err.message);
    return false;
  }
};

export const handleWebSocketConnection = (ws, initialParams) => {
  console.log("New WebSocket connection");

  let intervalId = null;
  let active = true;
  let streamParams = {
    type: "market",
    symbol: initialParams?.symbol?.toUpperCase() || "BTCUSDT",
    interval: initialParams?.interval || "1h",
    limit: initialParams?.limit || 100,
    refresh: initialParams?.refresh || 5000,
  };
  const cleanup = () => {
    active = false;
    if (intervalId) clearInterval(intervalId);
  };

  const sendData = async (params) => {
    if (!active || ws.readyState !== WebSocket.OPEN) {
      cleanup();
      return;
    }

    try {
      const response = await axios.get(
        "https://api1.binance.com/api/v3/klines",
        {
          params: {
            symbol: params.symbol.toUpperCase(),
            interval: params.interval,
            limit: params.limit,
          },
        }
      );

      const formatted = response.data.map((c) => ({
        time: c[0],
        open: parseFloat(c[1]),
        high: parseFloat(c[2]),
        low: parseFloat(c[3]),
        close: parseFloat(c[4]),
        volume: parseFloat(c[5]),
      }));

      ws.send(
        JSON.stringify({
          type: "marketData",
          data: formatted,
          symbol: params.symbol,
          interval: params.interval,
        })
      );
    } catch (err) {
      if (active && ws.readyState === WebSocket.OPEN) {
        ws.send(
          JSON.stringify({
            error: "Failed to fetch market data",
            details: err.response?.data || err.message,
          })
        );
      }
    }
  };

  ws.on("message", async (message) => {
    try {
      const data = JSON.parse(message);

      // Verify type matches
      if (data.type !== "market") {
        return ws.send(
          JSON.stringify({
            error: "Mismatched stream type",
            expected: "market",
            received: data.type,
          })
        );
      }
      const params = {
        symbol: data.symbol?.toUpperCase() || "BTCUSDT",
        interval: VALID_INTERVALS.includes(data.interval)
          ? data.interval
          : "1h",
        limit: Math.min(Math.max(data.limit || 100, 1), 1000),
        refresh: Math.max(data.refresh || 5000, 1000),
      };

      if (!(await validateSymbol(params.symbol))) {
        return ws.send(JSON.stringify({ error: "Invalid symbol" }));
      }

      // Restart stream with new parameters
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(() => sendData(params), params.refresh);
      sendData(params); // Immediate first response
    } catch (err) {
      ws.send(JSON.stringify({ error: "Invalid message format" }));
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
    cleanup();
  });

  ws.on("error", (err) => {
    console.error("WebSocket error:", err);
    cleanup();
  });

  // Send initial parameters request
  ws.send(
    JSON.stringify({
      type: "configRequest",
      message:
        "Send configuration parameters (symbol, interval, limit, refresh)",
    })
  );
};

export const streamMarketData = (ws, { symbol, interval, limit, refresh }) => {
  return setInterval(async () => {
    try {
      const response = await axios.get(
        "https://api1.binance.com/api/v3/klines",
        {
          params: { symbol, interval, limit },
        }
      );

      const formatted = response.data.map((c) => ({
        time: c[0],
        open: parseFloat(c[1]),
        high: parseFloat(c[2]),
        low: parseFloat(c[3]),
        close: parseFloat(c[4]),
        volume: parseFloat(c[5]),
      }));

      ws.send(JSON.stringify({ type: "marketData", data: formatted }));
    } catch (err) {
      console.error("Error fetching market data:", err.message);
      ws.send(JSON.stringify({ error: "Failed to fetch data" }));
    }
  }, refresh);
};
