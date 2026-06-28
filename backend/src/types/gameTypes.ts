export type Suit = 'h' | 'd' | 'c' | 's';

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type DeckSize = 36 | 52;

export type GameStatus = 'waiting' | 'in_progress' | 'paused' | 'finished';

export type RoundStage = 'unstarted' | 'first_attack' | 'first_defense' | 'scramble';


export interface Card {
    suit: Suit;
    rank: Rank;
}


export interface Player {
    socketID: string;
    hand: Card[];
}


export interface TablePair {
    attackCard: Card;
    defendCard: Card | null;
}


export interface GameState {
    status: GameStatus;
    players: Player[];
    deck: Card[];
    trumpCard: Card;
    trumpSuit: Suit;
    discardPile: Card[];
    roundStage: RoundStage;
    tableState: TablePair[];
    defenderInd: number;
    firstAttackerInd: number;
}



export interface RuleResponse {
    allowed: boolean;
    reason: string | null;
}

