import Transfer from '../models/Transfer';
export const startTransfer = async (creditId, debitId, amount, transaction) => {
	try {
		const options = transaction ? { transaction } : {};

		const transfer = await Transfer.create(
			{
				credit_id: creditId,
				debit_id: debitId, 
				amount: amount,
			},
			options
		);
		console.log('Transfer initiated:', transfer.toJSON());
		return transfer;
	} catch (error) {
		console.error('Error initiating transfer:', error);
		throw error;
	}
};
