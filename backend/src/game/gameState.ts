import type { GameState, DeckSize, Status } from '../types/gameTypes.js';
import { DEFAULT_DECK_SIZE } from '../config/constants.js';
import { createDeck } from './deck.js';

export function createGameState(deckSize: DeckSize = DEFAULT_DECK_SIZE): GameState {
    const deck = createDeck(deckSize, true);
    const trumpCard = deck[deck.length - 1]!;
    const trumpSuit = trumpCard.suit;
    const gameState: GameState = {
        status: 'waiting',
        players: [],
        deck: deck,
        trumpCard: trumpCard,
        trumpSuit: trumpSuit,
        playState: [],
        discardPile: []
    }

    return gameState
}

