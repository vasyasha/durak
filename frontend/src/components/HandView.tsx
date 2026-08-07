import type { Card } from '../types/gameTypes.js';
import { CardView } from './CardView.js';
import './HandView.css';

type HandPosition = 'player' | 'left' | 'top' | 'right';

interface HandViewProps {
    cards: Card[];
    position: HandPosition;
};

const positionClasses: Record<HandPosition, string> = {
    'player': 'hand-view--player',
    'left': 'hand-view--left',
    'top': 'hand-view--top',
    'right': 'hand-view--right'
};

export function HandView({ cards, position }: HandViewProps) {
    const cardElements = cards.map(card => <CardView key={`${card.suit}${card.rank}`} card={card} />);
    return (
        <div className={`hand-view ${positionClasses[position]}`}>
            {cardElements}
        </div>
    );
}