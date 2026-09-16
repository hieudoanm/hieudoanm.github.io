export type Mode = 'single' | 'dual';

export type RoundKind = 'standard' | 'flipped';

export type Phase = 'choose' | 'reveal' | 'done';

export interface RoundResult {
  round: number;
  kind: RoundKind;
  mode: Mode;
  price: number | null;
  priceB: number | null;
  priceL: number | null;
  qb: number;
  ql: number;
  revenue: number;
  cost: number;
  profit: number;
  beatBenchmark: boolean;
  foundOptimal: boolean;
}
