import { db } from '../database/knex.js';
import {
	createTransaction,
	findTransaction,
} from '../models/transaction.model.js';
import {
	decreaseBalance,
	getBalance,
	increaseBalance,
} from '../models/user.model.js';
import {
	NotFoundError,
	BadRequestError,
	ValidationError,
	UnauthorizedError,
	ForbiddenError,
	InternalServerError,
	BadTokenError,
	InsufficientBalance,
	TokenExpiredError,
} from '../utils/ApiError.js';
import { getUserIp } from '../utils/ip.js';
import { SuccessResponse } from './composition.controller.js';
let Transaction = {
	withdraw: async (req, res, next) => {
		const { amount } = req.body;
		if (amount <= 0) {
			return res.json('The minimum deposit is 1');
		}

		const userId = 1;
		try {
			let transactionId;
			await db.transaction(async (trx) => {
				[transactionId] = await Promise.all([
					createTransaction(userId, amount, 'debit', 'paymentProcessor', trx),
					decreaseBalance(userId, amount, trx),
					console.log(transactionId),
				]);
				// console.log(transactionId);
			});
			// const transactionResult = await findTransaction(transactionId[0]);
			SuccessResponse(
				res,
				`You have withdrawn ${amount} from your account`
				// transactionResult
			);
			await getUserIp(req);
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	deposit: async (req, res, next) => {
		const { amount } = req.body;
		const id = 1;

		try {
			let transactionId;
			await db.transaction(async (trx) => {
				[transactionId] = await Promise.all([
					createTransaction(1, amount, 'credit', 'paymentProcessor', trx),
					increaseBalance(1, amount, trx),
				]);
			});

			const transactionResult = await findTransaction(1);
			SuccessResponse(
				res,
				`You have deposited ${amount} to your account`,
				transactionResult
			);
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
	transfer: async (req, res) => {
		const { amount, recipientId } = req.body;
		const userId = req.user.id;

		try {
			const user = await findUserById(userId);

			if (!user) {
				throw new BadRequestError();
			}

			if (user.balance < amount) {
				throw new InsufficientBalance();
			}

			if (amount <= 0) {
				throw new ForbiddenError();
			}

			if (!amount) {
				throw new ForbiddenError();
			}

			let debitId, creditId, transactionContext;
			await Sequelize.transaction(async (transactions) => {
				[debitId, creditId] = await Promise.all([
					createTransaction(userId, amount, 'debit', 'transfer', transactions),
					createTransaction(
						recipientId,
						amount,
						'credit',
						'transfer',
						transactions
					),
					decreaseBalance(userId, amount, transactions),
					increaseBalance(recipientId, amount, transactions),
				]);
				transactionContext = transactions;
			});

			const result = await startTransfer(
				creditId,
				debitId,
				amount,
				transactionContext
			);

			// Handle result as needed
			// Send a success response to the client
			return SuccessResponse(res, 'Transfer successful', result);
		} catch (error) {
			next(error);
		}
	},
	balance: async (req, res, next) => {
		const id = 1;
		try {
			const balance = await getBalance(id);
			res.json({ balance });
		} catch (error) {
			console.error(error);
			next(error);
		}
	},
};
export default Transaction;
