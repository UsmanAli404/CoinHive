import express from 'express'
import userAuth from '../middleware/auth.js';
import { getUserData } from '../controllers/UserDataController.js';
const userRouter = express.Router();
userRouter.get('/data',userAuth,getUserData)

export default userRouter;