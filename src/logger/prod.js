import winston from 'winston';
const { combine, timestamp, printf } = winston.format;

export const prodLogger = async (req, res) => {
	const logger = winston.createLogger({
		format: combine(
			timestamp(),
			winston.format.errors({ stack: true }),
			myFormat
		),
		defaultMeta: { services: 'user-service' },
		transports: [new winston.transports.Console()],
	});
};
