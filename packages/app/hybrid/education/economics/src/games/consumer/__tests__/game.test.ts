import {
  budgetSatisfied,
  mrsAt,
  optimalBundle,
  priceRatio,
  qyOnBudget,
  score,
  utility,
} from '../game';
import type { LabParams } from '../game';

const base: LabParams = {
  income: 100,
  px: 2,
  py: 4,
  alpha: 0.5,
  goodType: 'cobb-douglas',
};

describe('qyOnBudget', () => {
  it('places the point on the budget line', () => {
    expect(qyOnBudget(base, 10)).toBe(20);
    expect(qyOnBudget(base, 50)).toBe(0);
    expect(qyOnBudget(base, 60)).toBe(0);
  });
});

describe('utility', () => {
  it('computes Cobb-Douglas utility', () => {
    expect(utility(base, 25, 12.5)).toBeCloseTo(Math.sqrt(25 * 12.5));
  });
  it('computes perfect substitutes utility', () => {
    expect(utility({ ...base, goodType: 'perfect-substitutes' }, 30, 40)).toBe(
      70
    );
  });
  it('computes perfect complements utility', () => {
    expect(utility({ ...base, goodType: 'perfect-complements' }, 12, 12)).toBe(
      12
    );
    expect(utility({ ...base, goodType: 'perfect-complements' }, 12, 20)).toBe(
      12
    );
  });
});

describe('optimalBundle', () => {
  it('finds the interior optimum for Cobb-Douglas', () => {
    const opt = optimalBundle(base);
    expect(opt.x).toBeCloseTo(25);
    expect(opt.y).toBeCloseTo(12.5);
  });
  it('finds the corner optimum for perfect substitutes', () => {
    const opt = optimalBundle({ ...base, goodType: 'perfect-substitutes' });
    expect(opt.x).toBeCloseTo(50);
    expect(opt.y).toBe(0);
  });
  it('finds the equal ratio optimum for perfect complements', () => {
    const opt = optimalBundle({ ...base, goodType: 'perfect-complements' });
    expect(opt.x).toBeCloseTo(100 / 6);
    expect(opt.y).toBeCloseTo(100 / 6);
  });
});

const cdParams: LabParams = { ...base, goodType: 'cobb-douglas' };

describe('mrsAt', () => {
  it('equals the price ratio at the Cobb-Douglas optimum', () => {
    const opt = optimalBundle(cdParams);
    expect(mrsAt(cdParams, opt.x, opt.y)).toBeCloseTo(priceRatio(cdParams));
  });
  it('is constant at 1 for perfect substitutes', () => {
    expect(mrsAt({ ...base, goodType: 'perfect-substitutes' }, 5, 5)).toBe(1);
  });
  it('is null for perfect complements', () => {
    expect(
      mrsAt({ ...base, goodType: 'perfect-complements' }, 5, 5)
    ).toBeNull();
  });
});

describe('budgetSatisfied', () => {
  it('confirms points on the budget line', () => {
    expect(budgetSatisfied(base, 10, 20)).toBe(true);
    expect(budgetSatisfied(base, 50, 0)).toBe(true);
    expect(budgetSatisfied(base, 10, 30)).toBe(false);
  });
});

describe('score', () => {
  it('rewards closeness to the optimal utility', () => {
    expect(score(25, 25)).toBe(100);
    expect(score(20, 25)).toBe(80);
    expect(score(0, 25)).toBe(0);
  });
});
