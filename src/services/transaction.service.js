import sequelizeService from './sequelize.service';
export const createTransaction = async (userId, amount, type, source) => {
	const t = await sequelize.transaction();

	try {
		const response = await sequelizeService.models.Transaction.create(
			{
				user_id: userId,
				amount,
				type,
				source,
			},
			{ transaction: t }
		);
		await t.commit();
		return response;
	} catch (error) {
		await t.rollback();
		throw error;
	}
};
export const findTransaction = async (id) => {
	try {
		const response = await Transaction.findByPk(id);
		return response;
	} catch (error) {
		console.error('Error initiating transaction:', error);
		throw error;
	}
};
