import { Router } from 'express';
import Transaction from '../controllers/transaction.controller.js';
const userRoutes = Router();

userRoutes.get('/balance', Transaction.balance);

export { userRoutes };
