import { Model, DataTypes } from 'sequelize';

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: DataTypes.STRING,
					allowNull: false,
					primaryKey: true,
				},
				name: {
					type: DataTypes.STRING,
					allowNull: false,
				},
				balance: {
					type: DataTypes.NUMBER,
					allowNull: false,
				},
			},
			{
				sequelize,
				timestamps: true,
			}
		);
		return this;
	}
}

export default User;
