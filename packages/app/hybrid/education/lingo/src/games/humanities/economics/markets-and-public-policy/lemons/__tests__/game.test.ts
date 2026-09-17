import { LEMON_CARS } from '../constants';
import { bestTrial, offeredGoods, offeredLemons, poolStats } from '../game';
import type { Trial } from '../types';

describe('price bands', () => {
  it('below the lemon reservation no one trades', () => {
    expect(offeredGoods(0)).toBe(0);
    expect(offeredLemons(0)).toBe(0);
    expect(offeredGoods(3999)).toBe(0);
    expect(offeredLemons(3999)).toBe(0);
    expect(poolStats(3999)).toEqual({
      offered: 0,
      expectedValue: 0,
      expectedProfit: 0,
      verdict: 'no-trade',
    });
  });

  it('between lemon and good reservations only lemons are offered', () => {
    expect(offeredGoods(4000)).toBe(0);
    expect(offeredLemons(4000)).toBe(LEMON_CARS);
    expect(offeredGoods(9999)).toBe(0);
    expect(offeredLemons(9999)).toBe(LEMON_CARS);
    expect(poolStats(5000)).toEqual({
      offered: LEMON_CARS,
      expectedValue: 6000,
      expectedProfit: 1000,
      verdict: 'only-lemons',
    });
    expect(poolStats(6000).expectedProfit).toBe(0);
    expect(poolStats(8000).expectedProfit).toBe(-2000);
  });

  it('at or above the good reservation the whole pool is offered at a loss', () => {
    expect(offeredGoods(10000)).toBe(4);
    expect(offeredLemons(10000)).toBe(LEMON_CARS);
    const stats = poolStats(12000);
    expect(stats.offered).toBe(20);
    expect(stats.expectedValue).toBe(7200);
    expect(stats.expectedProfit).toBe(-4800);
    expect(stats.verdict).toBe('mixed-pool');
  });

  it('every price at or above the good reservation loses money', () => {
    for (let price = 10000; price <= 15000; price += 500) {
      expect(poolStats(price).expectedProfit).toBeLessThan(0);
    }
  });
});

describe('bestTrial', () => {
  const rows: Trial[] = [
    {
      id: 1,
      price: 8000,
      goodsOffered: 0,
      lemonsOffered: 16,
      expectedValue: 6000,
      expectedProfit: -2000,
      verdict: 'only-lemons',
    },
    {
      id: 2,
      price: 5000,
      goodsOffered: 0,
      lemonsOffered: 16,
      expectedValue: 6000,
      expectedProfit: 1000,
      verdict: 'only-lemons',
    },
    {
      id: 3,
      price: 12000,
      goodsOffered: 4,
      lemonsOffered: 16,
      expectedValue: 7200,
      expectedProfit: -4800,
      verdict: 'mixed-pool',
    },
  ];

  it('returns the trial with the highest expected profit', () => {
    expect(bestTrial(rows)?.id).toBe(2);
  });

  it('returns null for an empty list', () => {
    expect(bestTrial([])).toBeNull();
  });
});
