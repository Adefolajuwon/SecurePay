import User from '../models/User';
export const createUser = async (email, password) => {
	const user = await User.create({ email, password: hashPassword(password) });
	return user;
};
export const findUserById = async (id, transaction) => {
	try {
		const options = transaction ? { transaction } : {};

		const user = await User.findByPk({ id, ...options });

		return user;
	} catch (error) {
		throw error;
	}
};

export const increaseBalance = async (id, amount, transaction) => {
	try {
		const options = transaction ? { transaction } : {};
		let user = await User.findByPk(id, options);

		if (user) {
			user.balance += amount;

			await user.save();

			console.log(`Balance increased by ${amount} for user with ID ${id}`);

			return user;
		} else {
			console.log(`User with ID ${id} not found.`);
			return null;
		}
	} catch (error) {
		console.error('Error increasing balance:', error);
		return null;
	}
};

export const decreaseBalance = async (id, amount) => {
	try {
		const options = transaction ? { transaction } : {};
		const user = await User.findByPk(id, options);

		if (user) {
			user.balance -= amount;

			await user.save();
			console.log(`Balance decreased by ${amount} for user with ID ${id}`);
			return user;
		} else {
			console.log(`User with ID ${id} not found.`);
		}
	} catch (error) {
		console.error('Error increasing balance:', error);
	}
};
