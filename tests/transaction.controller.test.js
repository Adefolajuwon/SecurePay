import Transaction from '../src/controllers/transaction.controller';
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
		// headers: { authorization: 'Bearer token' },
		body: { amount: -1 },
	};

	// Create a mock response object
	const res = {
		json: jest.fn(), // Mock the json function
	};

	await Transaction.withdraw(req, res);

	// Expect that the json function was called with the correct error message
	expect(res.json).toHaveBeenCalledWith('The minimum deposit is 1');
});
