import type { Challenge } from './types';

export const RATE_OF_RETURN = 0.08;
export const CAREER_LENGTH = 40;

export const YEARS_MIN = 0;
export const YEARS_MAX = 16;
export const R_MIN = 2;
export const R_MAX = 12;
export const COST_MIN = 0;
export const COST_MAX = 20000;
export const COST_STEP = 500;
export const W0_MIN = 20000;
export const W0_MAX = 60000;
export const W0_STEP = 1000;

export const DEFAULT_R = 8;
export const DEFAULT_COST = 5000;
export const DEFAULT_W0 = 30000;
export const DEFAULT_YEARS = 8;

export const TOTAL_CHALLENGES = 5;
export const PERFECT_SCORE = 100;
export const SCORE_PENALTY_PER_YEAR = 20;

export const CHALLENGES: Challenge[] = [
  { r: 4, costPerYear: 5000, w0: 30000 },
  { r: 6, costPerYear: 10000, w0: 30000 },
  { r: 8, costPerYear: 5000, w0: 30000 },
  { r: 4, costPerYear: 12000, w0: 50000 },
  { r: 10, costPerYear: 15000, w0: 40000 },
];
