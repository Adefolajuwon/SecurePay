import Transaction from '../src/controllers/transaction.controller';
import * as UserModels from '../src/models/user.model.js';
import * as TransferModel from '../src/models/transfer.model.js';
import * as TransactionModel from '../src/models/transaction.model.js';
function generateRandomUser() {
	const names = [
		'Alice',
		'Bob',
		'Charlie',
		'David',
		'Eva',
		'Frank',
		'Grace',
		'Helen',
		'Ivy',
		'Jack',
	];

	const randomName = `${
		names[Math.floor(Math.random() * names.length)]
	}-${Math.floor(Math.random() * 10e2)}`;
	const randomEmail = `user${Math.floor(Math.random() * 10e2)}@example.com`;

	return { name: randomName, email: randomEmail };
}
function generateUsers() {
	const user1 = generateRandomUser();
	let user2 = generateRandomUser();

	// Ensure user2 is different from user1
	while (user2.email === user1.email) {
		user2 = generateRandomUser();
	}

	return [user1, user2];
}

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

const defaultUser = {
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
describe('deposit', async () => {
	test('user gets error if balance <  amount', async () => {
		const req = {
			body: { amount: 1000 },
		};
		const res = {
			json: jest.fn(),
		};
		jest
			.spyOn(UserModels, 'findUserById')
			.mockImplementationOnce(
				() => new Promise((resolve) => resolve(defaultUser))
			);
	});
	jest
		.spyOn(UserModels, 'increaseBalance')
		.mockImplementationOnce(() => new Promise((resolve) => resolve([1])));
	jest
		.spyOn(TransactionModel, 'findTransaction')
		.mockImplementationOnce(
			() => new Promise((resolve) => resolve(creditTransaction))
		);
	const response = await Transaction.deposit(req, res);
	expect(response.success.json).toBe(true);
	expect(response.body.data).toMatchObject(creditTransaction);
});
