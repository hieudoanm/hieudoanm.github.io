export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export interface Move {
  player: Player;
  idx: number;
}

export interface LoseResult {
  player: Player;
  cells: number[];
}

export const WIN: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
