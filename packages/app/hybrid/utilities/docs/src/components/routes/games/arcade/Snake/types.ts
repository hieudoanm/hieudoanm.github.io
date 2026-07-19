export type Cell = 'empty' | 'snake' | 'head' | 'food';
export type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export interface Pos {
  r: number;
  c: number;
}
