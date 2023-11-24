import {
	createTransaction,
	findTransaction,
} from '../models/transaction.service.js';
import { decreaseBalance, increaseBalance } from '../models/user.service.js';
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
let Transaction = {
	withdraw: async (req, res, next) => {
		const { amount } = req.body;
		const id = req.user._id;
		try {
			let transactionId;
			[transactionId] = await Promise.all([
				createTransaction(id, amount, 'debit', 'paymentProcessor', transaction),
				decreaseBalance(id, amount, transaction),
			]);

			const transactionResult = await findTransaction(transactionId);
			sendSuccess();
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
			[transactionId] = await Promise.all([
				createTransaction(id, amount, 'credit', 'paymentProcessor', trx),
				increaseBalance(id, amount, trx),
			]);

			const transactionResult = await findTransaction(transactionId);
			sendSuccess(
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
				return sendError(res, 'User not found', HTTP_STATUS_CODE.NOT_FOUND);
			}

			if (user.balance < amount) {
				throw new InsufficientBalance();
			}

			if (amount <= 0) {
				return sendError(
					res,
					'Invalid amount',
					HTTP_STATUS_CODE.NOT_ACCEPTABLE
				);
			}

			if (!amount) {
				return sendError(
					res,
					'Please input amount',
					HTTP_STATUS_CODE.NOT_ACCEPTABLE
				);
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
			return sendSuccess(res, 'Transfer successful', HTTP_STATUS_CODE.OK);
		} catch (error) {
			next(error);
		}
	},
};
export default Transaction;
