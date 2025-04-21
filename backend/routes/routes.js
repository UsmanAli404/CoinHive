import express from 'express'
import {isAuthenticated, login, logout, register, sendVerificationOtp, resetPassword, sendPasswordResetOtp, verifyEmail, getUserData} from '../controllers/authControllers.js'
import userAuth from '../middleware/auth.js';


const authenticationRouter = express.Router();
authenticationRouter.post('/register',register)
authenticationRouter.post('/login',login)
authenticationRouter.post('/logout',logout)
authenticationRouter.post('/get-user-data', getUserData)
authenticationRouter.post('/send-verification-otp', sendVerificationOtp)
authenticationRouter.post('/verify-account', verifyEmail)
authenticationRouter.post('/is-authenticated', userAuth, isAuthenticated)
authenticationRouter.post('/send-reset-otp', sendPasswordResetOtp)
authenticationRouter.post('/reset-password', resetPassword)
export default authenticationRouter;