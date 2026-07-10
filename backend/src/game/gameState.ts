import type { GameState } from '../types/gameTypes.js';

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

