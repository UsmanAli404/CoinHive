import express from "express";
import connectDB from "./config/mogodb.js";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authenticationRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userroutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";

import {
  streamMarketData,
  handleWebSocketConnection,
} from "./ws/marketStream.js";
import { streamCoinMetrics, handleCoinMetricsSocket } from "./ws/coinStream.js";
import { WebSocketServer } from "ws";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req, res) => res.send("Server is Working"));
app.use("/api/auth", authenticationRouter);
app.use("/api/user", userRouter);
app.use("/api/market", marketRoutes);
app.use("/api/transaction", transactionRouter);

const server = app.listen(port, () =>
  console.log(`Server started on port: ${port}`)
);

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      if (!data.type) {
        return ws.send(JSON.stringify({ error: "Missing 'type' parameter" }));
      }

      const { type, ...params } = data;

      switch (type) {
        case "market":
          streamMarketData(ws, params);
          break;
        case "coins":
          streamCoinMetrics(ws, params);
          break;
        default:
          ws.send(JSON.stringify({ error: "Invalid type parameter" }));
      }
    } catch (error) {
      console.error("Error parsing message:", error.message);
    }
  });

  ws.on("close", () => console.log("WebSocket connection closed"));
  ws.on("error", (err) => console.error("WebSocket error:", err));
});
