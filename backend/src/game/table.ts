import type { Card, TablePair } from '../types/gameTypes.js';
import { areCardsEqual } from './card.js';

export function addNewToTable(tableState: TablePair[], attackCards: Card[]): TablePair[] {
    const newTablePairs = attackCards.map((attackCard) => ({ attackCard, defendCard: null }));
    return [...tableState, ...newTablePairs];
}

export function defendOnTable(tableState: TablePair[], defendCard: Card, attackCard: Card): TablePair[] {
    if (!tableState.some((pair) => areCardsEqual(pair.attackCard, attackCard))) {
        throw new Error('Attack card not found on table');
    }
    return tableState.map((pair) => areCardsEqual(pair.attackCard, attackCard) ? { ...pair, defendCard } : pair);
}

export function flattenTablePairs(tableState: TablePair[]): Card[] {
    return tableState.flatMap((pair) => (pair.defendCard === null ? [pair.attackCard] : [pair.attackCard, pair.defendCard]));
}