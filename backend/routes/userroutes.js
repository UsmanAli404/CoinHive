import express from 'express'
import userAuth from '../middleware/auth.js';
import { getUserDataByEmail, getUserDataById, getUserEmailFromId, getUserPortfolio } from '../controllers/UserDataController.js';

const userRouter = express.Router();

userRouter.post('/data-by-email', userAuth, getUserDataByEmail);
userRouter.post('/data-by-id', userAuth, getUserDataById);
userRouter.post('/portfolio-by-email', getUserPortfolio);
userRouter.post('/email-from-id', userAuth, getUserEmailFromId);

export default userRouter;