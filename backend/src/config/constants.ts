// PLAYER CONSTANTS
export const MAX_PLAYERS = 6;
export const MIN_PLAYERS = 2;

// CARD CONSTANTS
export const SUITS = ['h', 'd', 'c', 's'];
export const RANKS_52 = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
export const RANKS_36 = [6, 7, 8, 9, 10, 11, 12, 13, 14];
export const DECK_VARIANTS = {
    52: RANKS_SHORT,
    36: RANKS_FULL
};
export const RANK_DISPLAY = {
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A'
};