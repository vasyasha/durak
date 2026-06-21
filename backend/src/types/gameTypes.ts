export type Suit = 'h' | 'd' | 'c' | 's';

export type Rank = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type DeckSize = 36 | 52;

export type Status = 'waiting' | 'in-progress' | 'paused' | 'finished';



export interface Card {
    suit: Suit;
    rank: Rank;
}


export interface Player {
    id: string;
    username: string;
    hand: Card[];
}


export interface PlayPair {
    attackCard: Card;
    defendCard: Card | null;
}


export interface GameState {
    status: Status;
    players: Player[];
    deck: Card[];
    trumpCard: Card;
    trumpSuit: Suit;
    playState: PlayPair[];
    discardPile: Card[]
}