import {
  GOOD_CARS,
  GOOD_RESERVATION,
  GOOD_VALUE,
  LEMON_CARS,
  LEMON_RESERVATION,
  LEMON_VALUE,
} from './constants';
import type { PoolStats, Trial, Verdict } from './types';

export const offeredGoods = (price: number): number =>
  price >= GOOD_RESERVATION ? GOOD_CARS : 0;

export const offeredLemons = (price: number): number =>
  price >= LEMON_RESERVATION ? LEMON_CARS : 0;

const verdictFor = (goods: number, lemons: number): Verdict => {
  if (goods === 0 && lemons === 0) return 'no-trade';
  if (goods === 0) return 'only-lemons';
  return 'mixed-pool';
};

export const poolStats = (price: number): PoolStats => {
  const goods = offeredGoods(price);
  const lemons = offeredLemons(price);
  const offered = goods + lemons;
  if (offered === 0) {
    return {
      offered: 0,
      expectedValue: 0,
      expectedProfit: 0,
      verdict: 'no-trade',
    };
  }
  const expectedValue = (goods * GOOD_VALUE + lemons * LEMON_VALUE) / offered;
  return {
    offered,
    expectedValue,
    expectedProfit: expectedValue - price,
    verdict: verdictFor(goods, lemons),
  };
};

export const bestTrial = (rows: Trial[]): Trial | null => {
  let best: Trial | null = null;
  for (const row of rows) {
    if (best === null || row.expectedProfit > best.expectedProfit) best = row;
  }
  return best;
};
