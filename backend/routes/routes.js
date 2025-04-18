import express from 'express'
import {isAuthenticated, login, logout, register, resetPassword, sendPasswordResetOtp, sendVerifyOtp, verifyEmail} from '../controllers/authControllers.js'
import userAuth from '../middleware/auth.js';


const authenticationRouter = express.Router();
authenticationRouter.post('/register',register)
authenticationRouter.post('/login',login)
authenticationRouter.post('/logout',logout)
authenticationRouter.post('/send-verify-otp',userAuth,sendVerifyOtp)
authenticationRouter.post('/verify-account',userAuth,verifyEmail)
authenticationRouter.post('/is-authenticated',userAuth,isAuthenticated)
authenticationRouter.post('/send-reset-otp',sendPasswordResetOtp)
authenticationRouter.post('/reset-password',resetPassword)
export default authenticationRouter;