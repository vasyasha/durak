import type { GameState, DeckSize } from '../types/gameTypes.js';
import { DEFAULT_DECK_SIZE } from '../config/constants.js';
import { createDeck } from './deck.js';

export function createGameState(): GameState {
    const gameState: GameState = {
        status: 'waiting',
        players: [],
        deck: [],
        trumpCard: null,
        trumpSuit: null,
        discardPile: [],
        roundStage: 'unstarted',
        tableState: [],
        defenderInd: 1,
        firstAttackerInd: 0
    };

    return gameState;
}

