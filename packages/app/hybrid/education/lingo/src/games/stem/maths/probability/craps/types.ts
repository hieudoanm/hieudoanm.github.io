export type Phase = 'comeout' | 'point' | 'result';

export type ComeOutOutcome = 'win' | 'craps' | 'point';

export interface RollOutcome {
  dice: [number, number];
  total: number;
  phase: Phase;
  won: number;
}

export const STAKE = 10;
export const INITIAL_CREDITS = 200;
