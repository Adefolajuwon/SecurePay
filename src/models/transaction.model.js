import { db } from '../database/knex.js';

export const createTransaction = async (userId, amount, type, source, trx) => {
	const query = db('transactions').insert({
		user_id: userId,
		amount,
		type,
		source,
	});

	return trx ? query.transacting(trx) : query;
};

export const findTransaction = async (id) => {
	return id ? db('transactions').where('id', '=', id).first() : 'No ID found';
};
