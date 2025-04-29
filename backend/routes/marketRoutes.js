import express from 'express';
import { getMarketData, getActivityData, getCoins } from '../controllers/marketController.js';

const marketRouter = express.Router();

marketRouter.post('/market-data', getMarketData);
marketRouter.post('/activity', getActivityData);
marketRouter.post('/coins', getCoins);
export default marketRouter;
