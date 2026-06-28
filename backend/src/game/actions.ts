import type { GameState, Card, TablePair } from '../types/gameTypes.js';
import { } from '../config/constants.js';
import { addNewToTable, defendOnTable } from './table.js';
import { removeFromHand, addToHand } from './player.js';

// ALL THE RULE CHECKING TO BE DONE IN SOCKET FILE

export function attack(gameState: GameState, attackerInd: number, attackCards: Card[]): GameState {
    const newGameState: GameState = {
        ...gameState,
        tableState: addNewToTable(gameState.tableState, attackCards),
        players: gameState.players.with(attackerInd, removeFromHand(gameState.players[attackerInd], attackCards))
    }
    return newGameState
}

export function defend(gameState: GameState, defendCard: Card, attackCard: Card): GameState {
    const defenderInd = gameState.defenderInd;
    const newGameState: GameState = {
        ...gameState,
        tableState: defendOnTable(gameState.tableState, defendCard, attackCard),
        players: gameState.players.with(defenderInd, removeFromHand(gameState.players[defenderInd], [defendCard]))
    }
    return newGameState
}


