import type { Card } from '../types/gameTypes.js';
import type { HandPosition, CardRotation } from '../types/visualTypes.js';
import { CardView } from './CardView.js';
import './HandView.css';


interface HandViewProps {
    cards: Card[];
    position: HandPosition;
}

const positionClasses: Record<HandPosition, string> = {
    'player': 'hand-view-player',
    'left': 'hand-view-left',
    'top': 'hand-view-top',
    'right': 'hand-view-right'
};

const positionRotation: Record<HandPosition, CardRotation> = {
    'player': 'none',
    'left': 'right',
    'top': 'full',
    'right': 'left'
};

export function HandView({ cards, position }: HandViewProps) {
    const shown = (position === 'player');
    const rotation = positionRotation[position];
    const cardElements = cards.map(card => <CardView key={`${card.suit}${card.rank}`} card={card} shown={shown} rotation={rotation} />);
    return (
        <div className={`hand-view ${positionClasses[position]}`}>
            {cardElements}
        </div>
    );
}