export type Bet = 'under' | 'over' | 'seven';

export type Phase = 'bet' | 'result';

export type Result = 'win' | 'lose';

export interface RoundOutcome {
  dice: [number, number];
  won: number;
  result: Result;
}
