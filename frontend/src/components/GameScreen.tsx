import { HandView } from './HandView.js';
import './GameScreen.css';

function GameScreen() {
    return (
        <div className='game-layout'>
            <HandView position={'player'} cards={[{suit: 'h', rank: 6}, {suit: 's', rank: 10}, {suit: 'd', rank: 14}]} />
        </div>
    );
}

export default GameScreen;