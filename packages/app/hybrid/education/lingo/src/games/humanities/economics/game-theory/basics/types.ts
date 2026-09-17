export type GameId =
  | 'pd'
  | 'stag-hunt'
  | 'chicken'
  | 'coordination'
  | 'matching-pennies'
  | 'harmony'
  | 'challenge';

export type Phase = 'setup' | 'explore' | 'review' | 'quiz';

export type PayoffPair = [number, number];

export interface Strategy {
  id: string;
  label: string;
}

export interface Cell {
  row: number;
  col: number;
}

export interface Game {
  id: GameId;
  name: string;
  note: string;
  rowStrategies: [Strategy, Strategy];
  colStrategies: [Strategy, Strategy];
  payoffs: [[PayoffPair, PayoffPair], [PayoffPair, PayoffPair]];
}

export interface Review {
  cell: Cell;
  payoffA: number;
  payoffB: number;
  rowBestToCol: Cell;
  colBestToRow: Cell;
  rowBestIsOwn: boolean;
  colBestIsOwn: boolean;
  rowDominant: Strategy | null;
  colDominant: Strategy | null;
  nash: Cell[];
  nashCount: number;
  isNash: boolean;
}
