import { CLOSE_TOLERANCE, NEAR_TOLERANCE } from './constants';

export const spendingMultiplier = (mpc: number): number => 1 / (1 - mpc);

export const plannedExpenditure = (
  a: number,
  mpc: number,
  investment: number,
  government: number,
  output: number
): number => a + mpc * output + investment + government;

export const equilibriumOutput = (
  a: number,
  mpc: number,
  investment: number,
  government: number
): number => (a + investment + government) / (1 - mpc);

export const outputGap = (
  a: number,
  mpc: number,
  investment: number,
  government: number,
  target: number
): number => target - equilibriumOutput(a, mpc, investment, government);

export const requiredDeltaG = (
  a: number,
  mpc: number,
  investment: number,
  government: number,
  target: number
): number => outputGap(a, mpc, investment, government, target) * (1 - mpc);

export const unplannedInventory = (
  a: number,
  mpc: number,
  investment: number,
  government: number,
  output: number
): number =>
  output - plannedExpenditure(a, mpc, investment, government, output);

export type Verdict = 'closed' | 'overshoot' | 'under';

export const verdictFor = (chosen: number, required: number): Verdict => {
  const diff = chosen - required;
  if (Math.abs(diff) <= CLOSE_TOLERANCE) return 'closed';
  return diff > 0 ? 'overshoot' : 'under';
};

export const scoreRound = (chosen: number, required: number): number => {
  const diff = Math.abs(chosen - required);
  if (diff <= CLOSE_TOLERANCE) return 5;
  if (diff <= NEAR_TOLERANCE) return 3;
  return Math.max(0, 5 - (diff - NEAR_TOLERANCE) / 10);
};
