// FILE FOR NON-USER STUFF, SUCH AS DEALING CARDS, DISCARDING THE TABLE, INITIALLY PICKING TRUMP CARD ETC
import type { GameState, DeckSize, Player } from '../types/gameTypes.js';
import { DEFAULT_HAND_SIZE, DEFAULT_DECK_SIZE } from '../config/constants.js';
import { flattenTablePairs } from './table.js';
import { addToHand } from './player.js';
import { createDeck, dealCards } from './deck.js';
import { createGameState } from './gameState.js';


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


export function gameStartSetup(players: Player[], deckSize: DeckSize = DEFAULT_DECK_SIZE): GameState {
    // Important to initialize any game - Players (input via Socket?), initial deck and trump cards, (unsure about filling hands and turn order)
    const initDeck = createDeck(deckSize, true);
    const trumpCard = initDeck[0];
    const trumpSuit = trumpCard.suit;
    const deck = initDeck.slice(1);

    const initGameState = { ...createGameState(), players, trumpCard, trumpSuit, deck };
    const fullHandsGameState = fillHands(initGameState);

    // First attacker - person with lowest trump suit card. If lower than current trump card - swap with it. If no one has a trump suit card, pick a different trump card until the suit is in someones hand.
    // ALSO - just realized the hands need to be dealt before the trump card is chosen.

    const newGameState: GameState = { ...createGameState(), players, trumpCard, trumpSuit, deck };
    return newGameState;
}