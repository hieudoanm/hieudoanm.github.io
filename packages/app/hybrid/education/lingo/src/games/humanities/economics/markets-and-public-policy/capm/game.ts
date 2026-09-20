import {
  BOND_RETURN,
  BOND_SIGMA,
  CORRELATION,
  MAX_WEIGHT,
  MIN_WEIGHT,
  RISK_FREE,
  SIGMA_TOLERANCE,
  STOCK_RETURN,
  STOCK_SIGMA,
  TARGET_SIGMAS,
} from './constants';
import type { PortfolioStats, RoundType } from './types';

export const portfolioStats = (w: number): PortfolioStats => {
  const eR = w * STOCK_RETURN + (1 - w) * BOND_RETURN;
  const sigma = Math.sqrt(
    w * w * STOCK_SIGMA * STOCK_SIGMA +
      (1 - w) * (1 - w) * BOND_SIGMA * BOND_SIGMA +
      2 * w * (1 - w) * CORRELATION * STOCK_SIGMA * BOND_SIGMA
  );
  const sharpe = (eR - RISK_FREE) / sigma;
  return { eR, sigma, sharpe };
};

export const capmExpectedReturn = (
  beta: number,
  rm: number,
  rf: number
): number => rf + beta * (rm - rf);

export const roundType = (round: number): RoundType =>
  round <= TARGET_SIGMAS.length ? 'portfolio' : 'beta';

export const scorePortfolio = (sigma: number, target: number): number =>
  Math.max(0, 5 - Math.abs(sigma - target) * 200);

export const scoreBeta = (input: number, model: number): number =>
  Math.abs(input - model) <= SIGMA_TOLERANCE
    ? 5
    : Math.max(0, 5 - Math.abs(input - model) * 100);

export const isOnTarget = (sigma: number, target: number): boolean =>
  Math.abs(sigma - target) <= SIGMA_TOLERANCE;

export const bestWeightForSigma = (target: number): number => {
  let best = MIN_WEIGHT;
  let bestReturn = -Infinity;
  const steps = Math.round((MAX_WEIGHT - MIN_WEIGHT) / 0.001);
  for (let i = 0; i <= steps; i++) {
    const w = MIN_WEIGHT + i * 0.001;
    const stats = portfolioStats(w);
    if (isOnTarget(stats.sigma, target) && stats.eR > bestReturn) {
      bestReturn = stats.eR;
      best = w;
    }
  }
  return Math.round(best * 1000) / 1000;
};

export const efficientBonus = (w: number, target: number): number =>
  Math.abs(w - bestWeightForSigma(target)) <= 0.05 ? 1 : 0;
