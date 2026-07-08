import { TablePair } from '../types/gameTypes.js';
import { expect, test, describe } from 'vitest';
import { addNewToTable, defendOnTable, flattenTablePairs } from './table.js';


describe('flattenTablePairs', () => {
    test('Flattens a 2 pair fully defended table', () => {
        const tablePairs: TablePair[] = [
            { attackCard: { rank: 3, suit: 's' }, defendCard: { rank: 5, suit: 's' } },
            { attackCard: { rank: 6, suit: 'd' }, defendCard: { rank: 7, suit: 'c' } }
        ];
        const flattenedPairs = flattenTablePairs(tablePairs);
        expect(flattenedPairs).toStrictEqual([{ rank: 3, suit: 's' }, { rank: 5, suit: 's' }, { rank: 6, suit: 'd' }, { rank: 7, suit: 'c' }]);
    });

    test('Flattens a 2 pair not fully defended table', () => {
        const tablePairs: TablePair[] = [
            { attackCard: { rank: 3, suit: 's' }, defendCard: null },
            { attackCard: { rank: 6, suit: 'd' }, defendCard: { rank: 7, suit: 'c' } }
        ];
        const flattenedPairs = flattenTablePairs(tablePairs);
        expect(flattenedPairs).toStrictEqual([{ rank: 3, suit: 's' }, { rank: 6, suit: 'd' }, { rank: 7, suit: 'c' }]);
    });

    test('Flattens an empty table', () => {
        const flattenedPairs = flattenTablePairs([]);
        expect(flattenedPairs).toStrictEqual([]);
    });
});


describe('addNewToTable', () => {
    test('Add a card to empty table', () => {
        const finalTable: TablePair[] = addNewToTable([], [{ rank: 14, suit: 's' }]);
        expect(finalTable).toStrictEqual([{ attackCard: { rank: 14, suit: 's' }, defendCard: null }]);
    });

    test('Add a card to table of 1 card', () => {
        const initTable: TablePair[] = [{ attackCard: { rank: 14, suit: 'h' }, defendCard: null }];
        const finalTable: TablePair[] = addNewToTable(initTable, [{ rank: 14, suit: 's' }]);
        expect(finalTable).toStrictEqual([{ attackCard: { rank: 14, suit: 'h' }, defendCard: null }, { attackCard: { rank: 14, suit: 's' }, defendCard: null }]);
    });
});


describe('defendOnTable', () => {
    test('Defend on an empty table', () => {
        expect(() => defendOnTable([], { rank: 14, suit: 's' }, { rank: 14, suit: 'h' })).toThrow(new Error('Attack card not found on table'));
    });

    test('Defend nonextistent card', () => {
        expect(() => defendOnTable([{ attackCard: { rank: 2, suit: 'd' }, defendCard: null }], { rank: 14, suit: 's' }, { rank: 14, suit: 'h' })).toThrow(new Error('Attack card not found on table'));
    });

    test('Regular defend', () => {
        const initTable: TablePair[] = [{ attackCard: { rank: 14, suit: 'h' }, defendCard: null }];
        const finalTable: TablePair[] = defendOnTable(initTable, { rank: 14, suit: 's' }, { rank: 14, suit: 'h' });
        expect(finalTable).toStrictEqual([{ attackCard: { rank: 14, suit: 'h' }, defendCard: { rank: 14, suit: 's' } }]);
    });
});