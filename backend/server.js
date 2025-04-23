import express from "express"; 
import connectDB from "./config/mogodb.js";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser"
import authenticationRouter from "./routes/routes.js"
import userRouter from "./routes/userroutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import { streamMarketData } from "./controllers/marketController.js";

// WebSocket setup (importing default export from 'ws')
import WebSocket from 'ws';

const app = express();
const port  = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ Credentials: true }));

app.get('/', (req, res) => res.send("Server is Working"));
app.use('/api/auth', authenticationRouter);
app.use('/api/user', userRouter);
app.use('/api/market', marketRoutes);


const server = app.listen(port, () => console.log(`Server started on port: ${port}`));

const wss = new WebSocket.Server({ server });

//websockets
wss.on('connection', (ws) => {
    console.log('New WebSocket connection');
    streamMarketData(ws);
  
    ws.on('message', (message) => {
      console.log('Received message:', message);
    });
  
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  
    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });
});

