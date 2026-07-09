// Player = socket ID + their hand. Seat at the table = their index in the list of players in GameState.
import type { Player, Card } from '../types/gameTypes.js';
import { areCardsEqual } from './card.js';

export function createPlayer(socketID: string, hand: Card[] = [], passing: boolean = false): Player {
    return { socketID, hand, passing };
}

export function removeFromHand(player: Player, cards: Card[]): Player {
    return { ...player, hand: player.hand.filter((card1) => !cards.some((card2) => areCardsEqual(card1, card2))) };
}

export function addToHand(player: Player, cards: Card[]): Player {
    return { ...player, hand: [...player.hand, ...cards] };
}