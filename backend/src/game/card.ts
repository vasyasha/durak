import type { Suit, Rank, Card } from '../types/gameTypes.js';


export function createCard(suit: Suit, rank: Rank): Card {
    return { suit, rank };
}