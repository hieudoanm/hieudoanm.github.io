export type GameModule =
  'battle-of-the-sexes' | 'stag-hunt' | 'matching-pennies';

export type Row = 'Up' | 'Down';
export type Col = 'Left' | 'Right';

export type Payoff = [number, number];

export interface PayoffMatrix {
  label: string;
  rows: Row[];
  cols: Col[];
  matrix: Payoff[][];
  ne: [Row, Col][];
}

export type Phase = 'choose' | 'pick-row' | 'verdict' | 'summary';

export interface PlayResult {
  game: GameModule;
  row: Row;
  col: Col;
  playerPayoff: number;
  aiPayoff: number;
  isNE: boolean;
}
