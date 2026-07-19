import { MAX_THRESHOLD, MIN_THRESHOLD, POOL } from './constants';

export const randomThreshold = (): number =>
  Math.floor(Math.random() * (MAX_THRESHOLD - MIN_THRESHOLD + 1)) +
  MIN_THRESHOLD;

export const offerFor = (keep: number): number => POOL - keep;

export const resolve = (
  keep: number,
  threshold: number
): { accepted: boolean; payoff: number } => {
  const accepted = offerFor(keep) >= threshold;
  return { accepted, payoff: accepted ? keep : 0 };
};

export const formatCurrency = (n: number): string =>
  `$${n.toLocaleString('en-US')}`;
