export const GAME_NAME = { en: 'Masyu', ja: 'ましゅ' } as const;

export type PearlColor = 'black' | 'white';
export type Pearl = { row: number; col: number; color: PearlColor };
export type Grid = boolean[][];
