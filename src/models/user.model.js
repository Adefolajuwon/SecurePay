import { db } from '../database/knex.js';

export const findUserByEmail = async (email) => {
	return db('users').first().where('email', '=', email);
};

export const findUserById = async (id, trx) => {
	const query = db('users').first().where('id', '=', id);
	return trx ? query.transacting(trx) : query;
};

export const increaseBalance = async (id, amount, trx) => {
	const query = db('users')
		.where('id', '=', id)
		.increment('account_balance', amount);
	return trx ? query.transacting(trx) : query;
};

export const decreaseBalance = async (id, amount, trx) => {
	const query = db('users')
		.where('id', '=', id)
		.decrement('account_balance', amount);
	return trx ? query.transacting(trx) : query;
};

export const getBalance = async (userId) => {
	try {
		const [result] = await db('users')
			.where('id', '=', userId)
			.select('account_balance');
		return result ? result.account_balance : null;
	} catch (error) {
		console.error('Error fetching user balance:', error.message);
		throw error;
	}
};
