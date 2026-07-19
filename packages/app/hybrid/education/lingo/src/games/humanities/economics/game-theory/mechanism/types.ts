export type Rule = 'equal' | 'pivot';

export type Phase = 'choose' | 'reveal' | 'done';

export interface Outcome {
  built: boolean;
  payments: number[];
  pivotTaxes: number[];
}

export interface RoundResult {
  round: number;
  rule: Rule;
  value: number;
  values: number[];
  reports: number[];
  playerReport: number;
  built: boolean;
  payments: number[];
  pivotTaxes: number[];
  pivotal: boolean;
  reportedTruth: boolean;
  playerPayoff: number;
}
