import type { Card } from '../types/gameTypes.js';
import { CardView } from './CardView.js';
import './DeckTrumpArea.css';

interface DeckTrumpAreaProps {
    deckTopCard: Card | null;
    trumpCard: Card;
}

export function DeckTrumpArea({ deckTopCard, trumpCard }: DeckTrumpAreaProps) {
    // NEEDS TO BE REWORKED TO SHOW AN EMPTY CARD SLOT WHEN deckTopCard IS null
    const deckView = (deckTopCard === null) ? <div>{'NOTHING :('}</div> : <CardView card={deckTopCard} shown={false} />;
    return (
        <div className='deck-trump-area'>
            {deckView}
            <CardView card={trumpCard} shown={true} />
        </div>
    );
}