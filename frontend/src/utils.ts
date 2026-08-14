import type { Card } from './types/gameTypes.js';


export function cardString(card: Card): string {
    return `${card.suit}${card.rank}`;
}
