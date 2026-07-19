export const GAME_NAME = { en: 'Maze', ja: '\u8FF7\u8DEF' } as const;

export interface Cell {
  row: number;
  col: number;
  walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
  visited: boolean;
}

export interface Pos {
  row: number;
  col: number;
}
