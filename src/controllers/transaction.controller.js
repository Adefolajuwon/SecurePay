import {
	createTransaction,
	findTransaction,
} from '../services/transaction.service';
import { decreaseBalance, increaseBalance } from '../services/user.service';

const Transaction = {
	withdraw: async (req, res, next) => {
		const { amount } = req.body;
		const id = req.user._id;
		try {
			let transactionId;
			await Sequelize.transaction(async (transaction) => {
				[transactionId] = await Promise.all([
					createTransaction(id, amount, 'debit', paymentProcessor, transaction),
					decreaseBalance(id, amount, transaction),
				]);

				const transaction = await findTransaction(transactionId);
				res.status(200).json();
			});
		} catch (error) {
			console.error(error);
			sendError(
				res,
				'An error occurred',
				HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
			);
		}
	},
	deposit: async (req, res) => {
		const { amount } = req.body;
		const id = req.user._id;

		try {
			let transactionId;
			await Sequelize.transaction(async (transaction) => {
				[transactionId] = await Promise.all([
					createTransaction(
						id,
						amount,
						'credit',
						paymentProcessor,
						transaction
					),
					increaseBalance(id, amount, transaction),
				]);

				const transaction = await findTransaction(transactionId);
				sendSuccess(
					res,
					`You have deposited ${amount} to your account`,
					transaction
				);
			});
		} catch (error) {
			console.error(error);
			sendError(
				res,
				'An error occurred',
				HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
			);
		}
	},
	transfer: async (req, res) => {
		const { amount, recipientId } = req.body;
		const userId = req.user.id;

		try {
			// Get the user and check their balance
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

			let debitId, creditId, transactionContext; // Renamed 'transaction' to 'transactionContext'
			await Sequelize.transaction(async (transactions) => {
				[debitId, creditId] = await Promise.all([
					createTransaction(userId, amount, 'debit', 'transfer', transaction),
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
				transactionContext = transactions; // Assign 'transaction' to 'transactionContext'
			});

			const result = await startTransfer(
				creditId,
				debitId,
				amount,
				transactionContext
			); // Use 'transactionContext'

			// Handle result as needed

			// Send a success response to the client
			return sendSuccess(res, 'Transfer successful', HTTP_STATUS_CODE.OK);
		} catch (error) {
			// Handle errors and send an appropriate error response to the client
			return sendError(
				res,
				'Transfer failed',
				HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR
			);
		}
	},
};
export default Transaction;
