import { db } from '../database/knex.js';
export const createTransfer = async (
	creditId,
	debitId,
	amount,
	transaction
) => {
	let response = db('transfers').insert({
		credit_id: creditId,
		debit_id: debitId,
		amount,
	});
	if (transaction) response = response.transacting(transaction);
	return response;
};
