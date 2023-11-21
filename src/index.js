import http from 'http';
import express from 'express';
import app from './index.js';
import sequelizeService from './services/sequelize.service.js';
const PORT = process.env.PORT || 8003;

const serverApp = express();

serverApp.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

serverApp.use(express.json());

const server = http.createServer(serverApp);

server.listen(PORT, async () => {
	await sequelizeService.init();
	console.log('sequelize initiated');

	console.log(`Server started on PORT ${PORT}...`);
});
