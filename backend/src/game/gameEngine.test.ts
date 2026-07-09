import type { GameState } from '../types/gameTypes.js';
import { DEFAULT_DECK_SIZE, DEFAULT_HAND_SIZE } from '../config/constants.js';
import { expect, test, describe } from 'vitest';
import { gameStartSetup, fillHands } from './gameEngine.js';
import { createPlayer } from './player.js';


describe('fillHands', () => {
    test('Fill 4 players empty hands initially', () => {
        const initState: GameState = gameStartSetup([createPlayer(''), createPlayer(''), createPlayer(''), createPlayer('')]);
        const finalState = fillHands(initState);
        for (const player of finalState.players) {
            expect(player.hand.length).toBe(DEFAULT_HAND_SIZE);
        };
        expect(finalState.deck.length).toBe(DEFAULT_DECK_SIZE - 1 - DEFAULT_HAND_SIZE*4);
    });
    test('Fill 4 players empty hands with only 2 players worth of cards left', () => {
        const blankState = gameStartSetup([createPlayer(''), createPlayer(''), createPlayer(''), createPlayer('')]);
        const initState: GameState = { ...blankState, deck: blankState.deck.slice(-(DEFAULT_HAND_SIZE+1)) };
        const finalState = fillHands(initState);
        // Fills first attacker (ind 0) hand fully, then fills next attacker (ind 2) with 1 card from the deck and the trump card
        expect(finalState.players[0].hand.length).toBe(DEFAULT_HAND_SIZE);
        expect(finalState.players[2].hand.length).toBe(2);
        expect(finalState.trumpCard).toBe(null);
        expect(finalState.deck.length).toBe(0);
    });
});