import express from 'express'
import userAuth from '../middleware/auth.js';
import { getUserDataByEmail, getUserDataById } from '../controllers/UserDataController.js';

const userRouter = express.Router();

// userRouter.get('/data-by-email', userAuth, getUserDataByEmail);
// userRouter.get('/data-by-id', userAuth, getUserDataById);

userRouter.get('/data-by-email', getUserDataByEmail);
userRouter.get('/data-by-id', getUserDataById);

export default userRouter;