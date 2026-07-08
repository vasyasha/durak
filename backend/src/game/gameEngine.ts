// FILE FOR NON-USER STUFF, SUCH AS DEALING CARDS, DISCARDING THE TABLE, INITIALLY PICKING TRUMP CARD ETC
import type { GameState, Card } from '../types/gameTypes.js';
import { DEFAULT_HAND_SIZE } from '../config/constants.js';
import { addNewToTable, defendOnTable, flattenTablePairs } from './table.js';
import { removeFromHand, addToHand } from './player.js';
import { dealCards } from './deck.js';


export function discardTable(gameState: GameState): GameState {
    const newGameState: GameState = {
        ...gameState,
        tableState: [],
        discardPile: [...gameState.discardPile, ...flattenTablePairs(gameState.tableState)]
    };
    return newGameState;
}

export function fillHands(gameState: GameState, handSize: number = DEFAULT_HAND_SIZE): GameState {
    let players = gameState.players;
    let deck = gameState.deck;
    let trumpCard = gameState.trumpCard;

    // Order of dealing: first attacker -> all non-defenders clockwise -> defender.
    const defenderInd = gameState.defenderInd;
    const firstAttackerInd = gameState.firstAttackerInd;
    const attackerOrder = Array.from({ length: players.length }, (_, i) => (firstAttackerInd + i) % players.length).filter(ind => ind !== defenderInd);
    const dealingOrder = [...attackerOrder, defenderInd];
    
    for (const i of dealingOrder) {
        const numCards = handSize - players[i].hand.length;
        const cardDealResult = dealCards(deck, numCards);
        let dealtCards = cardDealResult.dealtCards;
        // If player gets last card of the deck without filling their hand, take the trump card
        if ((dealtCards.length + players[i].hand.length < handSize) && (trumpCard !== null)) {
            dealtCards = [...dealtCards, trumpCard];
            trumpCard = null;
        }
        deck = cardDealResult.remainingDeck;
        players = players.with(i, addToHand(players[i], dealtCards));
    };

    const newGameState = { ...gameState, players, deck, trumpCard };
    return newGameState;
}