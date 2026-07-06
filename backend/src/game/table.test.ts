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
});