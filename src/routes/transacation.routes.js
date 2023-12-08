import Transaction from '../controllers/transaction.controller.js';
import express from 'express';
import { fetchUser } from '../middlewares/fetchUser.js';
import { rateLimit } from '../middlewares/rateLimiting.js';
const router = express.Router();

router.use('/withdraw', Transaction.withdraw);
router.use('/deposit', Transaction.deposit);
router.use('/transfer', Transaction.transfer);

export default router;
