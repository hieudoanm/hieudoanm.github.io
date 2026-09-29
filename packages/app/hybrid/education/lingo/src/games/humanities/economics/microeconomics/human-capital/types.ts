export type Phase = 'choose' | 'reveal' | 'done';

export type Mode = 'sandbox' | 'challenge';

export interface Challenge {
  r: number;
  costPerYear: number;
  w0: number;
}

export interface RoundResult {
  round: number;
  mode: Mode;
  r: number;
  costPerYear: number;
  w0: number;
  years: number;
  annualWage: number;
  pvEarnings: number;
  pvCost: number;
  npv: number;
  optimalYears: number;
  optimalNpv: number;
  score: number | null;
}
