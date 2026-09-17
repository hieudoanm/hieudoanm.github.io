import { BASE_PRICE, BASE_Q } from '../constants';
import {
  bestPriceSoFar,
  bestTrialRevenue,
  elasticityClass,
  isOptimalPrice,
  makeTrial,
  quantityAt,
  revenueAt,
} from '../game';

describe('quantityAt', () => {
  it('computes isoelastic quantity and rounds it', () => {
    expect(quantityAt(BASE_Q, BASE_PRICE, 5, 2)).toBe(40);
    expect(quantityAt(BASE_Q, BASE_PRICE, 20, 0.5)).toBe(7);
    expect(quantityAt(BASE_Q, BASE_PRICE, 10, 1)).toBe(10);
  });

  it('guards against non-positive prices', () => {
    expect(quantityAt(BASE_Q, BASE_PRICE, 0, 2)).toBe(0);
    expect(quantityAt(BASE_Q, BASE_PRICE, -3, 2)).toBe(0);
  });
});

describe('revenueAt', () => {
  it('is price times rounded quantity', () => {
    expect(revenueAt(BASE_PRICE, BASE_Q, 5, 2)).toBe(200);
    expect(revenueAt(BASE_PRICE, BASE_Q, 20, 0.5)).toBe(140);
    expect(revenueAt(BASE_PRICE, BASE_Q, 10, 1)).toBe(100);
  });

  it('shows elastic low price beats base revenue', () => {
    expect(revenueAt(BASE_PRICE, BASE_Q, 5, 2)).toBeGreaterThan(100);
  });

  it('shows inelastic high price beats base revenue', () => {
    expect(revenueAt(BASE_PRICE, BASE_Q, 20, 0.5)).toBeGreaterThan(100);
  });

  it('keeps revenue near 100 across prices when unit elastic', () => {
    for (const p of [5, 10, 20]) {
      const revenue = revenueAt(BASE_PRICE, BASE_Q, p, 1);
      expect(Math.abs(revenue - 100)).toBeLessThanOrEqual(10);
    }
  });
});

describe('elasticityClass', () => {
  it('classifies elasticity by magnitude', () => {
    expect(elasticityClass(0.5)).toBe('inelastic');
    expect(elasticityClass(0.2)).toBe('inelastic');
    expect(elasticityClass(1)).toBe('unit');
    expect(elasticityClass(2)).toBe('elastic');
    expect(elasticityClass(3)).toBe('elastic');
  });
});

describe('isOptimalPrice', () => {
  it('marks the extreme price as optimal per class', () => {
    expect(isOptimalPrice(30, 0.5)).toBe(true);
    expect(isOptimalPrice(30, 2)).toBe(false);
    expect(isOptimalPrice(1, 2)).toBe(true);
    expect(isOptimalPrice(1, 0.5)).toBe(false);
    expect(isOptimalPrice(15, 1)).toBe(true);
  });
});

describe('makeTrial', () => {
  it('builds a fully populated trial', () => {
    const trial = makeTrial(5, 2);
    expect(trial.price).toBe(5);
    expect(trial.quantity).toBe(40);
    expect(trial.revenue).toBe(200);
    expect(trial.guidance).toMatch(/Elastic/i);
  });
});

describe('bestPriceSoFar', () => {
  it('returns null for no trials', () => {
    expect(bestPriceSoFar([], 2)).toBeNull();
  });

  it('picks the max revenue trial in a round', () => {
    const trials = [makeTrial(30, 2), makeTrial(1, 2), makeTrial(15, 2)];
    const best = bestPriceSoFar(trials, 2);
    expect(best?.price).toBe(1);
  });

  it('treats every price equal under unit elasticity', () => {
    const trials = [makeTrial(10, 1), makeTrial(20, 1)];
    const best = bestPriceSoFar(trials, 1);
    expect(best?.price).toBe(10);
  });
});

describe('bestTrialRevenue', () => {
  it('returns 0 for no trials', () => {
    expect(bestTrialRevenue([])).toBe(0);
  });

  it('returns the maximum revenue across trials', () => {
    const trials = [makeTrial(30, 2), makeTrial(1, 2), makeTrial(15, 2)];
    expect(bestTrialRevenue(trials)).toBe(
      Math.max(...trials.map((t) => t.revenue))
    );
  });
});
