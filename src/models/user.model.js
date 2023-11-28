import { db } from '../database/knex.js';

export const findUserByEmail = async (email) => {
	return db('users').where('email', email).first();
};

export const findUserById = async (id, trx) => {
	let response = db('users').where('id', id).first();
	if (trx) response = response.transacting(trx);
	return response;
};

export const increaseBalance = async (id, amount, trx) => {
	let response = db('users')
		.where('id', id)
		.increment('account_balance', amount);
	if (trx) response = response.transacting(trx);
	return response;
};

export const decreaseBalance = async (id, amount, trx) => {
	let response = db('users')
		.where('id', id)
		.decrement('account_balance', amount);
	if (trx) response = response.transacting(trx);
	return response;
};
export const getBalance = async (userId) => {
	try {
		const result = await db('users')
			.where({ id: userId })
			.select('account_balance');

		if (result.length > 0) {
			return result[0].account_balance;
		}

		return null;
	} catch (error) {
		console.error('Error fetching user balance:', error.message);
		throw error;
	}
};
