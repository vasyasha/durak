import { PORT } from './config/config.js';
import app from './app.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);

const io = new Server(server, { cors: { origin: 'http://localhost:5173' } });

io.on('connection', (socket) => {
	socket.emit('greeting', 'Hello!');
});

server.listen(PORT, () => {
	console.log(`Server successfully started at http://localhost:${PORT}`);
});

