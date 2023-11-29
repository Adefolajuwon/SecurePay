import Transaction from '../src/controllers/transaction.controller';
import * as UserModels from '../src/models/user.model.js';
import * as TransferModel from '../src/models/transfer.model.js';
import * as TransactionModel from '../src/models/transaction.model.js';
const creditTransaction = {
	id: 1,
	user_id: 1,
	amount: 1000,
	type: 'credit',
	source: 'paymentProcessor',
};

const debitTransaction = {
	id: 1,
	user_id: 1,
	amount: 1000,
	type: 'debit',
	source: 'paymentProcessor',
};

const jwtInfo = {
	id: 1,
	iat: 1660211932,
	exp: 1660311932,
};

const user = {
	id: 1,
	email: 'mail@gmail.com',
	account_balance: 100,
};
const res = { headers: {}, body: {} };
test('user gets an error if the amount is less than 1', async () => {
	const req = {
		body: { amount: -1 },
	};

	const res = {
		json: jest.fn(),
	};

	await Transaction.withdraw(req, res);

	expect(res.json).toHaveBeenCalledWith('The minimum deposit is 1');
});
describe('deposit', () => {
	test('user gets error if balance <  amount', async () => {
		const req = {
			body: { amount: 1000 },
		};
		const res = {
			json: jest.fn(),
		};
		jest
			.spyOn(TransferModel, 'findUserById')
			.mockImplementationOnce(() => new Promise((resolve) => resolve(user)));
	});
});
