export const GAME_NAME = {
  en: 'Snake',
  ja: '\u30B9\u30CD\u30FC\u30AF',
} as const;

export type Cell = 'empty' | 'snake' | 'head' | 'food';
export type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export interface Pos {
  r: number;
  c: number;
}
