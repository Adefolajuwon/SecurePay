import http from 'http';
import express from 'express';
import router from './routes/transacation.routes.js';
import { userRoutes } from './routes/user.routes.js';
import { connectRedis } from './database/redis.js';
// import { logger } from './logger/index.js';
const PORT = process.env.PORT || 3001;

const serverApp = express();
serverApp.set('trust proxy', true);

serverApp.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

serverApp.use(express.json());
const server = http.createServer(serverApp);
serverApp.use('/api/v1', router);
serverApp.use('/api/v1', userRoutes);

// connectRedis();
// logger.info('info');
// logger.warn('warn');
// logger.error('error');
server.listen(PORT, async () => {
	console.log(`Server started on PORT ${PORT}...`);
});
