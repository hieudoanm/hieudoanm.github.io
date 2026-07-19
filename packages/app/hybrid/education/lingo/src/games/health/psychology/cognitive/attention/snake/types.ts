export type Cell = 'empty' | 'snake' | 'head' | 'food';

export type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export type Status = 'running' | 'over' | 'won';

export interface Pos {
  r: number;
  c: number;
}

export interface SnakeState {
  snake: Pos[];
  food: Pos;
  direction: Dir;
  score: number;
  status: Status;
}

export interface Board {
  cells: Cell[][];
  filled: number;
}
