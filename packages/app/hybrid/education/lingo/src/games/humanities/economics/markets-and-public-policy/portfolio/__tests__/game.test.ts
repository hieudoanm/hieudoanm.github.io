import { CHALLENGES, CORRELATIONS } from '../constants';
import {
  challengeIdealWeight,
  challengeSigma,
  diversificationBenefit,
  frontierPoints,
  liveStats,
  minVarianceWeights,
  normalize,
  portfolioER,
  portfolioSigma,
  scoreChallenge,
  sigmaFree,
  sigmaSystematic,
} from '../game';

const weights = { tech: 1 / 3, property: 1 / 3, bonds: 1 / 3 };

const manualVariance = (
  w: number[],
  sigmas: number[],
  corr: readonly (readonly number[])[]
): number => {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sum += w[i] * w[j] * sigmas[i] * sigmas[j] * corr[i][j];
    }
  }
  return sum;
};

describe('normalize', () => {
  it('scales arbitrary weights to sum to one', () => {
    const n = normalize({ tech: 60, property: 30, bonds: 10 });
    expect(n.tech + n.property + n.bonds).toBeCloseTo(1, 12);
    expect(n.tech).toBeCloseTo(0.6, 12);
  });

  it('falls back to equal thirds for zero weights', () => {
    const n = normalize({ tech: 0, property: 0, bonds: 0 });
    expect(n.tech).toBeCloseTo(1 / 3, 12);
  });
});

describe('portfolioER', () => {
  it('computes the weighted expected return', () => {
    expect(portfolioER(weights)).toBeCloseTo(0.06, 12);
    expect(portfolioER({ tech: 1, property: 0, bonds: 0 })).toBeCloseTo(
      0.1,
      12
    );
    expect(portfolioER({ tech: 0, property: 0, bonds: 1 })).toBeCloseTo(
      0.03,
      12
    );
  });
});

describe('portfolioSigma', () => {
  it('matches the full covariance formula for every weight', () => {
    const sigmas = [0.25, 0.1, 0.05];
    for (let i = 0; i <= 20; i++) {
      for (let j = 0; j + i <= 20; j++) {
        const w = [i / 20, j / 20, (20 - i - j) / 20];
        const input = { tech: w[0], property: w[1], bonds: w[2] };
        const expected = Math.sqrt(manualVariance(w, sigmas, CORRELATIONS));
        expect(portfolioSigma(input)).toBeCloseTo(expected, 12);
      }
    }
  });

  it('reports the pure asset risks at the corners', () => {
    expect(portfolioSigma({ tech: 1, property: 0, bonds: 0 })).toBeCloseTo(
      0.25,
      12
    );
    expect(portfolioSigma({ tech: 0, property: 0, bonds: 1 })).toBeCloseTo(
      0.05,
      12
    );
  });

  it('diversifies below the weighted-average risk in equal thirds', () => {
    const weightedAverage = (0.25 + 0.1 + 0.05) / 3;
    const sigma = portfolioSigma(weights);
    expect(sigma).toBeCloseTo(Math.sqrt(0.0105), 9);
    expect(sigma).toBeLessThan(weightedAverage);
  });
});

describe('diversificationBenefit', () => {
  it('is zero for a single-asset portfolio', () => {
    expect(
      diversificationBenefit({ tech: 1, property: 0, bonds: 0 })
    ).toBeCloseTo(0, 12);
  });

  it('is positive when correlations are below one', () => {
    expect(diversificationBenefit(weights)).toBeCloseTo(
      (0.25 + 0.1 + 0.05) / 3 - Math.sqrt(0.0105),
      6
    );
  });
});

describe('liveStats', () => {
  it('aggregates return, risk and benefit', () => {
    const stats = liveStats(weights);
    expect(stats.er).toBeCloseTo(0.06, 12);
    expect(stats.sigma).toBeCloseTo(Math.sqrt(0.0105), 9);
    expect(stats.benefit).toBeCloseTo(
      (0.25 + 0.1 + 0.05) / 3 - Math.sqrt(0.0105),
      6
    );
  });
});

describe('minVarianceWeights', () => {
  it('yields a feasible, lower-risk portfolio than any single asset', () => {
    const minVar = minVarianceWeights();
    const sigma = portfolioSigma(minVar);
    expect(minVar.tech + minVar.property + minVar.bonds).toBeCloseTo(1, 6);
    expect(sigma).toBeLessThan(0.05);
    expect(sigma).toBeLessThan(
      portfolioSigma({ tech: 1, property: 0, bonds: 0 })
    );
  });
});

describe('frontierPoints', () => {
  it('traces the Tech/Bonds mixture from pure bonds to pure tech', () => {
    const points = frontierPoints();
    const first = points[0];
    const last = points[points.length - 1];
    expect(first.er).toBeCloseTo(0.03, 12);
    expect(last.er).toBeCloseTo(0.1, 12);
    expect(points).toHaveLength(51);
  });
});

describe('challengeIdealWeight', () => {
  it('finds the analytic minimum-variance weight', () => {
    expect(challengeIdealWeight(CHALLENGES[0])).toBeCloseTo(0.02, 12);
  });

  it('finds the weight matching the target return', () => {
    expect(challengeIdealWeight(CHALLENGES[2])).toBeCloseTo(
      (0.06 - 0.03) / 0.07,
      12
    );
  });
});

describe('challengeSigma', () => {
  it('returns the single-asset sigma at the endpoints', () => {
    expect(challengeSigma(CHALLENGES[0], 1)).toBeCloseTo(0.25, 12);
    expect(challengeSigma(CHALLENGES[0], 0)).toBeCloseTo(0.05, 12);
  });
});

describe('scoreChallenge', () => {
  it('awards the full mark within the tolerance', () => {
    expect(scoreChallenge(0.02, CHALLENGES[0])).toBe(5);
    expect(scoreChallenge(0.01, CHALLENGES[0])).toBe(5);
  });

  it('decays with distance and clamps at zero', () => {
    expect(scoreChallenge(0.1, CHALLENGES[0])).toBe(0);
    expect(scoreChallenge(0.05, CHALLENGES[0])).toBeCloseTo(2, 12);
  });
});

describe('sigmaFree', () => {
  it('implements the 1/√N rule', () => {
    expect(sigmaFree(1)).toBeCloseTo(0.2, 12);
    expect(sigmaFree(4)).toBeCloseTo(0.1, 12);
    expect(sigmaFree(20)).toBeCloseTo(0.2 / Math.sqrt(20), 12);
  });
});

describe('sigmaSystematic', () => {
  it('equals the pure rule when no systematic factor exists', () => {
    expect(sigmaSystematic(20, 0)).toBeCloseTo(sigmaFree(20), 12);
  });

  it('approaches the systematic floor as N grows', () => {
    expect(sigmaSystematic(20, 1)).toBeCloseTo(0.2, 12);
    const floor = sigmaSystematic(20, 0.25);
    expect(floor).toBeCloseTo(Math.sqrt(0.25 * 0.04 + (0.75 * 0.04) / 20), 12);
    expect(floor).toBeGreaterThan(sigmaFree(20));
  });
});
