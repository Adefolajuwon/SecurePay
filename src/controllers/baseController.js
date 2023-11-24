export const sendSuccess = (res, message, data) => {
	return res.status(200).json({
		success: true,
		message: message || 'Succcess.',
		data: data || '',
	});
};
