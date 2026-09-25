import {
  bestWeightForSigma,
  capmExpectedReturn,
  efficientBonus,
  isOnTarget,
  portfolioStats,
  roundType,
  scoreBeta,
  scorePortfolio,
} from '../game';

const variance = (w: number): number =>
  w * w * 0.2 * 0.2 +
  (1 - w) * (1 - w) * 0.08 * 0.08 +
  2 * w * (1 - w) * 0.2 * 0.2 * 0.08;

describe('portfolioStats', () => {
  it('holds every weight on the two-asset formulas', () => {
    for (let i = -50; i <= 150; i++) {
      const w = i / 100;
      const stats = portfolioStats(w);
      expect(stats.eR).toBeCloseTo(w * 0.12 + (1 - w) * 0.04, 12);
      expect(stats.sigma).toBeCloseTo(Math.sqrt(variance(w)), 12);
      expect(stats.sharpe).toBeCloseTo(
        (w * 0.12 + (1 - w) * 0.04 - 0.03) / Math.sqrt(variance(w)),
        12
      );
    }
  });

  it('gives the pure stock portfolio at w = 1', () => {
    const stats = portfolioStats(1);
    expect(stats.eR).toBeCloseTo(0.12, 12);
    expect(stats.sigma).toBeCloseTo(0.2, 12);
    expect(stats.sharpe).toBeCloseTo(0.45, 12);
  });

  it('gives the pure bond portfolio at w = 0', () => {
    const stats = portfolioStats(0);
    expect(stats.eR).toBeCloseTo(0.04, 12);
    expect(stats.sigma).toBeCloseTo(0.08, 12);
    expect(stats.sharpe).toBeCloseTo(0.125, 12);
  });

  it('diversifies below the weighted average risk at w = 0.5', () => {
    const stats = portfolioStats(0.5);
    const weightedAverage = 0.5 * 0.2 + 0.5 * 0.08;
    expect(stats.sigma).toBeCloseTo(Math.sqrt(0.0132), 6);
    expect(stats.sigma).toBeLessThan(weightedAverage);
    expect(stats.sigma).toBeLessThan(0.14);
  });
});

describe('capmExpectedReturn', () => {
  it('prices the risk premium by beta', () => {
    expect(capmExpectedReturn(1.5, 0.1, 0.03)).toBeCloseTo(0.135, 12);
    expect(capmExpectedReturn(0.5, 0.1, 0.03)).toBeCloseTo(0.065, 12);
    expect(capmExpectedReturn(0, 0.1, 0.03)).toBe(0.03);
  });
});

describe('roundType', () => {
  it('classifies rounds 1-5 as portfolio and 6-7 as beta', () => {
    for (let round = 1; round <= 5; round++) {
      expect(roundType(round)).toBe('portfolio');
    }
    expect(roundType(6)).toBe('beta');
    expect(roundType(7)).toBe('beta');
  });
});

describe('scorePortfolio', () => {
  it('scores a perfect hit at the full mark', () => {
    expect(scorePortfolio(0.1, 0.1)).toBe(5);
    expect(scorePortfolio(0.101, 0.1)).toBeCloseTo(4.8, 12);
  });

  it('clamps at zero for far-off risk', () => {
    expect(scorePortfolio(0.16, 0.1)).toBe(0);
  });
});

describe('scoreBeta', () => {
  it('gives the full mark within the tolerance', () => {
    expect(scoreBeta(0.065, 0.065)).toBe(5);
    expect(scoreBeta(0.063, 0.065)).toBe(5);
    expect(scoreBeta(0.067, 0.065)).toBe(5);
  });

  it('decays with distance and clamps at zero', () => {
    expect(scoreBeta(0.1, 0.065)).toBeCloseTo(1.5, 12);
    expect(scoreBeta(0.16, 0.065)).toBe(0);
  });
});

describe('isOnTarget', () => {
  it('accepts risk within the tolerance band', () => {
    expect(isOnTarget(0.102, 0.1)).toBe(true);
    expect(isOnTarget(0.106, 0.1)).toBe(false);
  });
});

describe('bestWeightForSigma / efficientBonus', () => {
  it('finds the highest-return weight hitting the target risk', () => {
    const w = bestWeightForSigma(0.1);
    expect(isOnTarget(portfolioStats(w).sigma, 0.1)).toBe(true);
    expect(portfolioStats(w).eR).toBeGreaterThan(portfolioStats(0.4).eR);
  });

  it('awards a bonus only near the frontier weight', () => {
    expect(efficientBonus(0.4, 0.1)).toBe(1);
    expect(efficientBonus(-0.4, 0.1)).toBe(0);
  });
});
