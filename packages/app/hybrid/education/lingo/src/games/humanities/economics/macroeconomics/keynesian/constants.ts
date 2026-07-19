import type { RoundProfile } from './types';

export const MPC_MIN = 0.5;
export const MPC_MAX = 0.95;
export const MPC_STEP = 0.01;

export const A_MIN = 0;
export const A_MAX = 100;

export const INVEST_MIN = 0;
export const INVEST_MAX = 80;

export const GOV_MIN = 0;
export const GOV_MAX = 80;

export const DELTA_G_MAX = 80;

export const DEFAULT_MPC = 0.8;
export const DEFAULT_A = 40;
export const DEFAULT_INVESTMENT = 20;
export const DEFAULT_GOVERNMENT = 40;
export const DEFAULT_DELTA_G = 0;

export const CLOSE_TOLERANCE = 1;
export const NEAR_TOLERANCE = 5;

export const MAX_SCORE = 5;

export const TOTAL_ROUNDS = 5;

export const ROUNDS: RoundProfile[] = [
  { mpc: 0.8, a: 40, investment: 20, government: 40, target: 600 },
  { mpc: 0.9, a: 60, investment: 10, government: 30, target: 1500 },
  { mpc: 0.75, a: 50, investment: 25, government: 25, target: 600 },
  { mpc: 0.6, a: 80, investment: 40, government: 40, target: 550 },
  { mpc: 0.5, a: 90, investment: 30, government: 10, target: 360 },
];
