import { createClient } from 'redis';

const client = createClient({
	host: 'localhost',
	port: 6379,
});

export const connectRedis = async () => {
	client.on('error', function (err) {
		console.error('Error connecting to Redis:', err);
		process.exit(1);
	});

	try {
		// Connect to Redis
		await client.connect();
		console.log('Connected to Redis');

		// Set the cache_version
		await client.set('cache_version', 1);

		return client;
	} catch (error) {
		console.error('Error connecting to Redis:', error);
		process.exit(1);
	}
};

export const setWithExpiry = async (key, value, expiryInSeconds) => {
	await client.set(key, value, { EX: expiryInSeconds });
	console.log(`Set key: ${key} with expiry of ${expiryInSeconds} seconds.`);
};

export const getFromCache = async (key) => {
	const value = await client.get(key);
	return value;
};
export const incrementCache = async (value) => {
	const value = await client.incr();
	return value;
};
export const handleCacheInvalidation = async (cacheKey) => {
	try {
		// Delete the cache key from Redis
		await client.del(cacheKey);

		console.log(`Deleted cache entry for key: ${cacheKey}`);
	} catch (error) {
		console.error('Error deleting cache:', error);
	}
};
