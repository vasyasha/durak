import { useState, useEffect } from 'react';
import { socket } from './socket.js';

function App() {
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        const onConnect = () => console.log(socket.id);
        socket.on('connect', onConnect);
        const onPlayerJoined = () => alert('ANOTHA ONE');
        socket.on('playerJoined', onPlayerJoined);
        const updateClicks = (newClicks: number) => setClicks(newClicks);
        socket.on('clicksUpdated', updateClicks);
        return () => { 
            socket.off('connect', onConnect);
            socket.off('clicksUpdated', updateClicks);
            socket.off('playerJoined', onPlayerJoined);
        };
    }, []);

    return (
        <>
        <div>Hello!</div>
        <button onClick = { () => { console.log('buttonClicked emit'); socket.emit('buttonClicked'); } }>Click!</button>
        <div>Button clicked {clicks} times</div>
        </>
    );
}

export default App;