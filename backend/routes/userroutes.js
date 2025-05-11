import express from 'express'
import userAuth from '../middleware/auth.js';
import { getUserDataByEmail, getUserDataById } from '../controllers/UserDataController.js';

const userRouter = express.Router();

userRouter.post('/data-by-email', userAuth, getUserDataByEmail);
userRouter.post('/data-by-id', userAuth, getUserDataById);

export default userRouter;