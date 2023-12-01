import { getUserIp } from '../utils/ip.js';
import { setWithExpiry, incrementCache } from '../database/redis.js';
// import { BadRequestError } from '../utils/ApiError';
import { number } from 'yup';
export const rateLimit = async (req, res, next) => {
	// let value = 0;
	const expiryInSeconds = 3600;
	try {
		const ip = getUserIp(req);
		if (!ip) {
			res.status(404).json({ error: 'No ip found' });
		}
		await incrementCache(number);
		console.log(number);
		if (number == 21) {
			return res.status(503).json('');
		}

		setWithExpiry(ip, number, expiryInSeconds);
	} catch (error) {
		console.log(error);
		next(error);
	}
};
