export type Position = 'in' | 'cash';

export type Phase = 'play' | 'done';

export interface RoundResult {
  round: number;
  returnPct: number;
  tip: number;
  position: Position;
  wealthAfter: number;
}

export interface Summary {
  playerWealth: number;
  buyAndHoldWealth: number;
  coinFlipWealth: number;
  tipStrategyWealth: number;
  rounds: RoundResult[];
}
