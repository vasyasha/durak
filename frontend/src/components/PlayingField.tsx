import { DeckTrumpArea } from './DeckTrumpArea';
import './PlayingField.css';

export function PlayingField() {
    return (
        <div className='playing-field'>
            <DeckTrumpArea deckTopCard={{ suit: 'h', rank: 6 }} trumpCard={{ suit: 's', rank: 6 }}/>
        </div>
    );
}