export type WallSide = 'top' | 'right' | 'bottom' | 'left';

export interface Cell {
  row: number;
  col: number;
  walls: Record<WallSide, boolean>;
  visited: boolean;
}

export interface Pos {
  row: number;
  col: number;
}

export interface Move {
  from: Pos;
  to: Pos;
  wall: WallSide;
  opposite: WallSide;
}

export interface Carve {
  to: Cell;
  wall: WallSide;
  opposite: WallSide;
}

export const OPPOSITES: Record<WallSide, WallSide> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
};

export const DIRECTIONS: [number, number, WallSide][] = [
  [-1, 0, 'top'],
  [0, 1, 'right'],
  [1, 0, 'bottom'],
  [0, -1, 'left'],
];
