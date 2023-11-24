import http from 'http';
import express from 'express';
import router from './routes/transacation.routes.js';
const PORT = process.env.PORT || 8004;

const serverApp = express();

serverApp.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

serverApp.use(express.json());
const server = http.createServer(serverApp);
serverApp.use('/api/v1', router);

server.listen(PORT, async () => {
	console.log(`Server started on PORT ${PORT}...`);
});
