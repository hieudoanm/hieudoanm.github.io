export interface FiscalRound {
  gap: number;
  mpc: number;
}

export const ROUNDS: FiscalRound[] = [
  { gap: 100, mpc: 0.8 },
  { gap: 80, mpc: 0.6 },
  { gap: 120, mpc: 0.5 },
  { gap: 60, mpc: 0.7 },
  { gap: 150, mpc: 0.75 },
  { gap: 90, mpc: 0.65 },
];

export const TOTAL_ROUNDS = ROUNDS.length;

export const MIN_LEVER = 0;
export const MAX_LEVER = 250;
