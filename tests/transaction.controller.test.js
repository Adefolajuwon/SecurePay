import * as TransferRepository from '../src/models/transferModel';
import * as UserModel from '../src/models/userModels';
import Transaction from '../src/controller/transactionController';
import { InsufficientBalance } from '../src/utils/ApiError';
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
test('user get an error if they do not have enough balance', async () => {
	const req = {
		headers: { authorization: `Bearer ${jwtInfo}` },
		body: { amount: 3000 },
	};
	jest
		.spyOn(req.headers.authorization)
		.mockImplementationOnce((token) => jwtInfo);
	jest
		.spyOn(UserModel, 'findUserById')
		.mockImplementationOnce(() => new Promise((resolve) => resolve(user)));
	const response = await Transaction.transfer(req, res);
	expect(response.body.message).toBe(new InsufficientBalance().message);
});
