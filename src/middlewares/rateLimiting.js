import { getUserIp } from '../utils/ip.js';
import {
	setWithExpiry,
	incrementCache,
	setToZeroWithExpiry,
} from '../database/redis.js';
// import { BadRequestError } from '../utils/ApiError';
/**This doesnt work  */
export const rateLimit = async (req, res, next) => {
	const expiryInSeconds = 3600;
	try {
		const ip = await getUserIp(req);

		// console.log(ip);
		if (!ip) {
			return res.status(404).json({ error: 'No ip found' });
		}
		const cacheKey = ip;
		const cached = await getFromCache(cacheKey);
		if (cachedListings) {
			console.log('Retrieved data from Redis cache.');
			return res.json(JSON.parse(cachedListings));
		}

		let number = await incrementCache(ip);
		console.log(number);
		if (number === 3) {
			return res.status(503).json('error');
		}

		setToZeroWithExpiry(ip, expiryInSeconds);
		next();
	} catch (error) {
		console.log(error);
		next(error);
	}
};
