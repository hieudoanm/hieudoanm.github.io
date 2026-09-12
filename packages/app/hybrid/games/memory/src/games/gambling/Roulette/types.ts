export type RouletteBet =
  'red' | 'black' | 'even' | 'odd' | 'low' | 'high' | 'zero';

export interface BetDef {
  id: RouletteBet;
  label: string;
  payout: number;
}

export type Phase = 'bet' | 'result';

export interface SpinOutcome {
  number: number;
  won: number;
}
