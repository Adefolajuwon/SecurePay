import dotenv from 'dotenv';
dotenv.config();

/**
 * Get the token from the headers
 * check if it starts with Bearer(if it does not the token is invalid)
 * split the token
 *  and set req.user to the user info
 */
export const fetchUser = async (req, res) => {
	let auth = req.headers.authorization;
	if (!auth || !auth.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'User not authenticated' });
	}

	const token = auth.split(' ')[1];
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = payload.user;
		return req.user;
	} catch (error) {
		console.error(error);
		return res.status(401).json({ error: 'Invalid token' });
	}
};
