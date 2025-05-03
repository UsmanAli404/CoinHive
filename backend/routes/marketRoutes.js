import express from 'express';
import userAuth from '../middleware/auth.js';
import { getMarketData, getActivityData, getCoins, getAllCoins } from '../controllers/marketController.js';

const marketRouter = express.Router();

marketRouter.post('/market-data', userAuth, getMarketData);
marketRouter.post('/activity', userAuth, getActivityData);
marketRouter.post('/coins', userAuth, getCoins);
marketRouter.get('/coins-list', userAuth, getAllCoins);
export default marketRouter;
