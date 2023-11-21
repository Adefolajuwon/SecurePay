import { Model, DataTypes } from 'sequelize';

class Transfer extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.BIGINT,
					primaryKey: true,
					autoIncrement: true,
					unsigned: true,
				},
				user_id: {
					type: DataTypes.BIGINT,
					unsigned: true,
					allowNull: false,
					references: {
						model: 'users', // Adjust the model name if needed
						key: 'id',
					},
					onUpdate: 'CASCADE',
					onDelete: 'CASCADE',
				},
				amount: {
					type: DataTypes.DECIMAL(19, 4),
					allowNull: false,
				},
				type: {
					type: DataTypes.ENUM('credit', 'debit'),
					allowNull: false,
				},
				source: {
					type: DataTypes.ENUM('paymentProcessor', 'transfer'),
					allowNull: false,
				},
				createdAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				},
				updatedAt: {
					type: DataTypes.DATE,
					allowNull: false,
					defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				},
			},
			{
				sequelize,
				modelName: 'Transfer',
			}
		);
		return this;
	}
}

export default Transfer;
