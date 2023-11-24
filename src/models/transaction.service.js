import { db } from '../database/knex.js';

export const createTransaction = async (
	userId,
	amount,
	type,
	source,
	transaction
) => {
	let response = db('transactions').insert({
		user_id: userId,
		amount,
		type,
		source,
	});
	if (transaction) response = response.transacting(transaction);
	return response;
};

export const findTransaction = async (id) => {
	return db('transactions').where('id', id).first();
};
