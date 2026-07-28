import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';

export function socketInit(server: HTTPServer) {
    const io = new Server(server, { cors: { origin: 'http://localhost:5173' } });
    let clicks = 0;

    io.on('connection', (socket) => {
        console.log(socket.id);
        socket.broadcast.emit('playerJoined');
        socket.emit('clicksUpdated', clicks);
        socket.on('buttonClicked', () => {
            console.log(`BUTT CLICKED BY ${socket.id}`);
            clicks += 1;
            io.emit('clicksUpdated', clicks); 
        });
    });

    

    return io;
}
