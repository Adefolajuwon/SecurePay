import { db } from '../database/knex.js';

export const createTransaction = async (userId, amount, type, source, trx) => {
	let response = db('transactions').insert({
		user_id: userId,
		amount,
		type,
		source,
	});
	if (trx) response = response.transacting(trx);
	// console.log({ createTRansaction: response });
	return response;
};

export const findTransaction = async (id) => {
	if (!id) {
		return 'no id found';
	}
	return db('transactions').where('id', id).first();
};
