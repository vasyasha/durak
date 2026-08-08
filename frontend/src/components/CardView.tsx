import type { Card } from '../types/gameTypes.js';
import './CardView.css';

interface CardViewProps {
    card: Card;
    shown: boolean;
    rotated?: boolean;
}

export function CardView({ card, shown, rotated=false }: CardViewProps) {
    const cardText = shown ? `${card.suit}${card.rank}` : '';
    return (
        <div className={`card-view ${rotated ? 'card-view-rotated' : ''}`}>{cardText}</div>
    );
}