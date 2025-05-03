import express from 'express'
import userAuth from '../middleware/auth.js';
import {makeTransaction} from '../controllers/transactionController.js';

const transactionRouter = express.Router()

transactionRouter.post('/make-transaction', userAuth, makeTransaction);
export default transactionRouter;