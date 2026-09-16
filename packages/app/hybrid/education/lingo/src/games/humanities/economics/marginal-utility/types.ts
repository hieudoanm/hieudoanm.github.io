export type Good = 'apple' | 'cookie';

export type Mode = 'lab' | 'challenge';

export type Phase = 'choose' | 'reveal' | 'done';

export interface Bundle {
  apples: number;
  cookies: number;
}

export interface LabResult {
  round: number;
  pa: number;
  pc: number;
  income: number;
  apples: number;
  cookies: number;
  optimal: Bundle;
  achievedUtility: number;
  optimalUtility: number;
  score: number;
}

export interface ChallengeScenario {
  pa: number;
  pc: number;
  income: number;
  options: Bundle[];
}

export interface ChallengeResult {
  round: number;
  pa: number;
  pc: number;
  income: number;
  selected: number;
  optimalIndex: number;
  chosen: Bundle;
  optimal: Bundle;
  correct: boolean;
  utilityRatio: number;
}
