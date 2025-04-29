import express from 'express'

import {makeTransaction} from '../controllers/transactionController.js';

const transactionRouter = express.Router()

transactionRouter.post('/make-transaction', makeTransaction);
export default transactionRouter;