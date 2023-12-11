import winston from 'winston';
const { combine, timestamp, printf } = winston.format;

export const devLogger = async (req, res) => {
	const myFormat = printf(({ level, message, label, timestamp, stack }) => {
		return `${timestamp} [${label}] ${level}: ${stack || message}`;
	});

	return winston.createLogger({
		format: combine(
			winston.format.colorize(),
			timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
			winston.format.errors({ stack: true }),
			myFormat
		),
		transports: [new winston.transports.Console()],
	});
};
