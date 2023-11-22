import Transaction from '../controllers/transaction.controller';
import express, { Router } from 'express';
const Router = express.Router();

Router.use('/withdraw', Transaction.withdraw);
Router.use('/deposit', Transaction.deposit);
Router.use('/transfer', Transaction.transfer);

export default Router;
