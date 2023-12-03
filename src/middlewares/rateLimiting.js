import { getUserIp } from '../utils/ip.js';
import {
	setWithExpiry,
	incrementCache,
	setToZeroWithExpiry,
} from '../database/redis.js';
// import { BadRequestError } from '../utils/ApiError';

export const rateLimit = async (req, res, next) => {
	const expiryInSeconds = 3600;
	try {
		const ip = await getUserIp(req);
		const ipString = ip.toString();

		console.log(ipString);
		if (!ipString) {
			return res.status(404).json({ error: 'No ip found' });
		}

		let number = await incrementCache(ipString);
		if (number === 21) {
			return res.status(503).json('');
		}

		setToZeroWithExpiry(ipString, expiryInSeconds);
		next();
	} catch (error) {
		console.log(error);
		next(error);
	}
};
