/**
 * retrieve user ip from http request
 */
export const getUserIp = async (req) => {
	try {
		// Get the client's IP address from headers
		console.log('Request Headers:', req.headers);

		const ipAddress =
			req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if (!ipAddress) {
			console.log('No IP address found');
		}

		// Store the IP address in the request object
		req.clientIp = ipAddress;

		// Return the obtained IP address
		console.log(ipAddress);
		return ipAddress;
	} catch (error) {
		console.error(error);
		// Handle the error appropriately (e.g., log or return a default value)
		return null;
	}
};
