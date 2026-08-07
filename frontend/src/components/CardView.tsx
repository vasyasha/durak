import type { Card } from '../types/gameTypes.js';

interface CardViewProps {
    card: Card
}

export function CardView({ card }: CardViewProps) {
    return (
        <div className='card'>{`${card.suit}${card.rank}`}</div>
    );
}