import express from "express";
import connectDB from "./config/mogodb.js";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authenticationRouter from "./routes/routes.js";
import userRouter from "./routes/userroutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import transactionRouter from "./routes/transactionRoutes.js";
import { handleWebSocketConnection } from "./controllers/marketController.js";

import WebSocket from "ws";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use(cookieParser());
<<<<<<< HEAD
app.use(cors({ origin: "http://localhost:5173", credentials: false }));
=======
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));
>>>>>>> df3ef5dd9dfb581bdd942d959c3fc1cf9b317ea7

app.get("/", (req, res) => res.send("Server is Working"));
app.use("/api/auth", authenticationRouter);
app.use("/api/user", userRouter);
app.use("/api/market", marketRoutes);
app.use("/api/transaction", transactionRouter);

const server = app.listen(port, () =>
  console.log(`Server started on port: ${port}`)
);

const wss = new WebSocket.Server({ server });

wss.on("connection", handleWebSocketConnection);
