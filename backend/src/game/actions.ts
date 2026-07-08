import type { GameState, Card } from '../types/gameTypes.js';
import { addNewToTable, defendOnTable, flattenTablePairs } from './table.js';
import { removeFromHand, addToHand } from './player.js';

// ALL THE RULE CHECKING TO BE DONE IN SOCKET FILE

export function attack(gameState: GameState, attackerInd: number, attackCards: Card[]): GameState {
    const players = gameState.players;
    const newGameState: GameState = {
        ...gameState,
        tableState: addNewToTable(gameState.tableState, attackCards),
        players: players.with(attackerInd, removeFromHand(players[attackerInd], attackCards))
    };
    return newGameState;
}

export function defend(gameState: GameState, defendCard: Card, attackCard: Card): GameState {
    const players = gameState.players;
    const defenderInd = gameState.defenderInd;
    const newGameState: GameState = {
        ...gameState,
        tableState: defendOnTable(gameState.tableState, defendCard, attackCard),
        players: players.with(defenderInd, removeFromHand(players[defenderInd], [defendCard]))
    };
    return newGameState;
}

export function pass(gameState: GameState, passerInd: number): GameState {
    const players = gameState.players;
    const newGameState: GameState = {
        ...gameState,
        players: players.with(passerInd, { ...players[passerInd], passing: true })
    };
    return newGameState;
}

export function take(gameState: GameState): GameState {
    const players = gameState.players;
    const defenderInd = gameState.defenderInd;
    const newGameState: GameState = {
        ...gameState,
        tableState: [],
        players: players.with(defenderInd, addToHand(players[defenderInd], flattenTablePairs(gameState.tableState)))
    };
    return newGameState;
}
