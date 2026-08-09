import type { Card } from '../types/gameTypes.js';
import type { CardRotation } from '../types/visualTypes.js';
import './CardView.css';

interface CardViewProps {
    card: Card;
    shown: boolean;
    rotation: CardRotation;
}


const rotationClasses: Record<CardRotation, string> = {
    'none': '',
    'left': 'card-view-rotated-left',
    'right': 'card-view-rotated-right',
    'full': 'card-view-rotated-full'
};


export function CardView({ card, shown, rotation }: CardViewProps) {
    const cardText = shown ? `${card.suit}${card.rank}` : '';
    return (
        <div className={`card-view ${rotationClasses[rotation]}`}>{cardText}</div>
    );
}