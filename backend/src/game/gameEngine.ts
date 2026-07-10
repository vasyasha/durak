// FILE FOR NON-USER STUFF, SUCH AS DEALING CARDS, DISCARDING THE TABLE, INITIALLY PICKING TRUMP CARD ETC
import type { GameState, DeckSize, Player } from '../types/gameTypes.js';
import { DEFAULT_HAND_SIZE, DEFAULT_DECK_SIZE } from '../config/constants.js';
import { flattenTablePairs } from './table.js';
import { addToHand, removeFromHand } from './player.js';
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
    // Important to initialize any game - Players (input via Socket?), initial deck and trump cards, filling hands and turn order

    // Initialize and shuffle deck, deal to players
    const initDeck = createDeck(deckSize, true);
    const initGameState: GameState = { ...createGameState(), players, deck: initDeck };
    const fullHandsGameState = fillHands(initGameState);
    const fullHandsPlayers = fullHandsGameState.players;

    // Code to find a suitable trump card - one of the players needs to have in their hand a card of that suit.
    const playerSuitsSet = new Set(fullHandsPlayers.flatMap((player) => player.hand.map((card) => card.suit)));
    const fullHandsDeck = fullHandsGameState.deck;
    const trumpCardInd = fullHandsDeck.findIndex((card) => playerSuitsSet.has(card.suit));
    if (trumpCardInd === -1) {
        throw new Error('Could not find a suitable trump card');
    }
    const initTrumpCard = fullHandsDeck[trumpCardInd];
    const trumpSuit = initTrumpCard.suit;
    const finalDeck = fullHandsDeck.toSpliced(trumpCardInd, 1);

    // Find first attacker - person with the smallest trump-suit card
    const firstAttackerFindResult = fullHandsPlayers
        .flatMap((player, ind) => player.hand
            .filter((card) => card.suit === trumpSuit)
            .map((card) => ({ card, ind })))
        .reduce((min, cur) => cur.card.rank < min.card.rank ? cur : min);
    const firstAttackerTrumpCard = firstAttackerFindResult.card;
    const firstAttackerInd = firstAttackerFindResult.ind;

    // If first attacker's trump-suit card is smaller than the trump card, swap them
    let finalTrumpCard = initTrumpCard;
    let finalPlayers = fullHandsPlayers;
    if (firstAttackerTrumpCard.rank < initTrumpCard.rank) {
        finalTrumpCard = firstAttackerTrumpCard;
        finalPlayers = fullHandsPlayers.with(firstAttackerInd, addToHand(removeFromHand(fullHandsPlayers[firstAttackerInd], [firstAttackerTrumpCard]), [initTrumpCard]));
    };

    const defenderInd = (firstAttackerInd + 1) % finalPlayers.length;



    const newGameState: GameState = { ...fullHandsGameState, players: finalPlayers, trumpCard: finalTrumpCard, trumpSuit, deck: finalDeck, defenderInd, firstAttackerInd };
    return newGameState;
}