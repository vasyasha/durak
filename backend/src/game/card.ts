import type { Suit, Rank, Card } from '../types/gameTypes.js';


export function createCard(suit: Suit, rank: Rank): Card {
    return { suit, rank };
}

export function areCardsEqual(card1: Card, card2: Card): boolean {
    return card1.suit === card2.suit && card1.rank === card2.rank
}