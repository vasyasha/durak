// Decks can be of different variants (aka sizes), I used to only play 36 but want to keep the option of more cards open.

import type { Rank, Card, DeckSize } from '../types/gameTypes.js';
import { SUITS, DECK_VARIANTS, DEFAULT_DECK_SIZE } from '../config/constants.js';
import { createCard } from './card.js';

export function createDeck(deckSize: DeckSize = DEFAULT_DECK_SIZE, shuffled: boolean = false): Card[] {
    // Pick the right ranks, e.g. 6-14 for the 36 deck variant
    const ranks: Rank[] = DECK_VARIANTS[deckSize];
    const deck: Card[] = [];
    for (const rank of ranks) {
        for (const suit of SUITS) {
            deck.push(createCard(suit, rank));
        }
    }
    // Shuffle deck before returning if shuffled=true
    return shuffled ? shuffle(deck) : deck;
}

function shuffle(deck: Card[]): Card[] {
    // Copy so doesnt shuffle in-place
    const shuffledDeck = [...deck];
    // Durstenfeld shuffle
    for (let i = (shuffledDeck.length - 1); i > 0; i -= 1) {
        // Random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap the random index with card at i, the exclamation points are TypeScript's non-null assertion operators
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
}


export function dealCards(deck: Card[], n: number): { dealtCards: Card[], remainingDeck: Card[] } {
    const dealtCards = deck.slice(0, n);
    const remainingDeck = deck.slice(n);
    return { dealtCards, remainingDeck };
} 
