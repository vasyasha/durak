import type { GameState } from '../types/gameTypes.js';
import { DEFAULT_DECK_SIZE, DEFAULT_HAND_SIZE } from '../config/constants.js';
import { expect, test, describe } from 'vitest';
import { gameStartSetup, fillHands } from './gameEngine.js';
import { createPlayer } from './player.js';


const emptyPlayerList = [createPlayer(''), createPlayer(''), createPlayer(''), createPlayer('')];

describe('fillHands', () => {
    test('Fill 4 players empty hands with only 2 players worth of cards left', () => {
        const blankState = gameStartSetup(emptyPlayerList);
        const initState: GameState = { ...blankState, deck: blankState.deck.slice(-(DEFAULT_HAND_SIZE + 1)), players: emptyPlayerList };
        const finalState = fillHands(initState);
        const players = finalState.players;
        
        // Fills first attacker (ind 0) hand fully, then fills next attacker (ind 2) with 1 card from the deck and the trump card
        expect(players[finalState.firstAttackerInd].hand.length).toBe(DEFAULT_HAND_SIZE);
        expect(players[(finalState.firstAttackerInd + 2) % players.length].hand.length).toBe(2);
        expect(finalState.trumpCard).toBeNull();
        expect(finalState.deck.length).toBe(0);
    });
});

describe('gameStartSetup', () => {
    test('Initial game setup', () => {
        const finalState: GameState = gameStartSetup(emptyPlayerList);
        for (const player of finalState.players) {
            expect(player.hand.length).toBe(DEFAULT_HAND_SIZE);
        };
        expect(finalState.deck.length).toBe(DEFAULT_DECK_SIZE - 1 - DEFAULT_HAND_SIZE * 4);
        expect(finalState.trumpCard).not.toBeNull();
        expect(finalState.trumpSuit).not.toBeNull();
    });
});