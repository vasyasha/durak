import { HandView } from './HandView.js';
import { SettingsArea } from './SettingsArea.js';
import { MenuArea } from './MenuArea.js';
import { ActionsArea } from './ActionsArea.js';
import { PlayingField } from './PlayingField.js';
import './GameScreen.css';


export function GameScreen() {
    return (
        <div className='game-screen'>
            <HandView position={'player'} cards={[{ suit: 'h', rank: 7 }, { suit: 'h', rank: 10 }, { suit: 'h', rank: 14 }]} />
            <HandView position={'left'} cards={[{ suit: 'd', rank: 7 }, { suit: 'd', rank: 10 }, { suit: 'd', rank: 14 }]} />
            <HandView position={'top'} cards={[{ suit: 's', rank: 7 }, { suit: 's', rank: 10 }, { suit: 's', rank: 14 }]} />
            <HandView position={'right'} cards={[{ suit: 'c', rank: 7 }, { suit: 'c', rank: 10 }, { suit: 'c', rank: 14 }]} />
            <SettingsArea />
            <MenuArea />
            <ActionsArea defending={false} />
            <PlayingField />
        </div>
    );
}