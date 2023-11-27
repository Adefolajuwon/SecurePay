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
	console.log({ decreaseBalance: response });
	return response;
};
export const getBalance = async (id) => {
	let response = db('users').where('id', id).select('account_balance');
	return response;
};
