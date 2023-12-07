import http from 'http';
import express from 'express';
import router from './routes/transacation.routes.js';
import { userRoutes } from './routes/user.routes.js';
import { connectRedis } from './database/redis.js';
const PORT = process.env.PORT || 3000;

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
connectRedis();
server.listen(PORT, async () => {
	console.log(`Server started on PORT ${PORT}...`);
});
