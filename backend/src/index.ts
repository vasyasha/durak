import { PORT } from './config/config.js';
import app from './app.js';
import { createServer } from 'http';
import { socketInit } from './socket.js';

const server = createServer(app);

const io = socketInit(server);

server.listen(PORT, () => {
	console.log(`Server successfully started at http://localhost:${PORT}`);
});

