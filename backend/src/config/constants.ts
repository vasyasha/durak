import type { Suit, Rank, DeckSize, RuleResponse } from '../types/gameTypes.js';


// ROOM CONSTANTS
export const MAX_PLAYERS: number = 6;
export const MIN_PLAYERS: number = 2;


// CARD CONSTANTS
export const SUITS: Suit[] = ['h', 'd', 'c', 's'];
export const RANKS_52: Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
export const RANKS_36: Rank[] = [6, 7, 8, 9, 10, 11, 12, 13, 14];
export const RANK_DISPLAY: Partial<Record<Rank, string>> = {
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A'
};


// GAME CONSTANTS
export const DEFAULT_DECK_SIZE: DeckSize = 36;
export const DECK_VARIANTS: Record<DeckSize, Rank[]> = {
    52: RANKS_52,
    36: RANKS_36
};
export const DEFAULT_HAND_SIZE: number = 6;


// RULE CONSTANTS
export const RULE_PASSED: RuleResponse = { allowed: true, reason: null };