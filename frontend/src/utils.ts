import type { Suit, Rank, Card } from './types/gameTypes.js';

import { Assets, Texture } from 'pixi.js';

export function cardString(card: Card): string {
    return `${card.suit}${card.rank}`;
}

export async function loadGameTextures(): Promise<Record<string, Texture>> {
    const allSuits: Suit[] = ['h', 'd', 'c', 's'];
    const allRanks: Rank[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const allCardStrings: string[] = allSuits.flatMap((suit) => allRanks.map((rank) => cardString({ suit, rank })));
    const allTextureStrings = [...allCardStrings, 'back'];
    const allTextures = await Promise.all(allTextureStrings.map((textureString) => Assets.load(`/cards/${textureString}.png`)));
    return Object.fromEntries(allTextures.map((texture, i) => [allTextureStrings[i], texture]));
}