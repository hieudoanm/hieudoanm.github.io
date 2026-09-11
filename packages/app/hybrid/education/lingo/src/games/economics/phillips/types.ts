export type Policy = 'expansion' | 'contraction' | 'hold';

export type Phase = 'pick' | 'reveal' | 'done';

export interface Scenario {
  startInflation: number;
  startUnemployment: number;
}

export interface RoundResult {
  round: number;
  startInflation: number;
  startUnemployment: number;
  policy: Policy;
  anchor: number;
  newInflation: number;
  newUnemployment: number;
  lrInflation: number;
}
