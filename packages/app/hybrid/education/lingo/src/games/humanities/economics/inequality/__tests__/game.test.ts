import {
  BASE_INCOMES_A,
  BASE_INCOMES_B,
  MISS_POINTS,
  NEAR_POINTS,
  POVERTY_LINE,
  WIN_POINTS,
} from '../constants';
import {
  afterPolicy,
  gini,
  giniAfter,
  lorenzPoints,
  mean,
  povertyHeadcount,
  scoreRound,
} from '../game';

describe('mean', () => {
  it('averages household incomes', () => {
    expect(mean([2, 4, 6])).toBe(4);
  });

  it('returns zero for an empty list', () => {
    expect(mean([])).toBe(0);
  });
});

describe('gini', () => {
  it('computes the pairwise Gini for the base income vectors', () => {
    expect(gini(BASE_INCOMES_A)).toBeCloseTo(0.3056603774, 5);
    expect(gini(BASE_INCOMES_B)).toBeCloseTo(0.5712871287, 5);
  });

  it('returns zero for perfectly equal, zero-total, or empty distributions', () => {
    expect(gini([50, 50, 50])).toBe(0);
    expect(gini([0, 0, 0])).toBe(0);
    expect(gini([])).toBe(0);
  });
});

describe('afterPolicy', () => {
  it('is revenue-neutral: total income is unchanged', () => {
    const after = afterPolicy(BASE_INCOMES_A, 0.3);
    const before = BASE_INCOMES_A.reduce((sum, y) => sum + y, 0);
    expect(after.reduce((sum, y) => sum + y, 0)).toBeCloseTo(before, 5);
  });

  it('pays a lump-sum rebate of the tax rate times the mean', () => {
    const meanA = mean(BASE_INCOMES_A);
    const after = afterPolicy(BASE_INCOMES_A, 0.3);
    expect(after[0]).toBeCloseTo(
      (1 - 0.3) * BASE_INCOMES_A[0] + 0.3 * meanA,
      5
    );
  });

  it('preserves the income ordering', () => {
    const after = afterPolicy(BASE_INCOMES_A, 0.3);
    for (let index = 1; index < after.length; index++) {
      expect(after[index]).toBeGreaterThanOrEqual(after[index - 1]);
    }
  });
});

describe('giniAfter progressivity', () => {
  it('scales the base Gini down as the tax-and-rebate rate rises', () => {
    expect(giniAfter(BASE_INCOMES_A, 0)).toBeCloseTo(gini(BASE_INCOMES_A), 5);
    expect(giniAfter(BASE_INCOMES_A, 0.25)).toBeCloseTo(
      (1 - 0.25) * gini(BASE_INCOMES_A),
      5
    );
    expect(giniAfter(BASE_INCOMES_A, 0.3)).toBeCloseTo(
      (1 - 0.3) * gini(BASE_INCOMES_A),
      5
    );
  });

  it('never moves the Gini upward across increasing rates', () => {
    const flat = giniAfter(BASE_INCOMES_A, 0);
    const moderate = giniAfter(BASE_INCOMES_A, 0.3);
    const steep = giniAfter(BASE_INCOMES_A, 0.6);
    expect(moderate).toBeLessThan(flat);
    expect(steep).toBeLessThan(moderate);
  });
});

describe('povertyHeadcount', () => {
  it('counts only incomes strictly below the poverty line', () => {
    expect(povertyHeadcount(BASE_INCOMES_A, POVERTY_LINE)).toBe(0.2);
    expect(povertyHeadcount(BASE_INCOMES_B, POVERTY_LINE)).toBe(0.4);
  });

  it('falls after a progressive tax-and-rebate', () => {
    expect(
      povertyHeadcount(afterPolicy(BASE_INCOMES_A, 0.3), POVERTY_LINE)
    ).toBe(0.1);
  });

  it('returns zero for an empty list', () => {
    expect(povertyHeadcount([], POVERTY_LINE)).toBe(0);
  });
});

describe('scoreRound', () => {
  const TARGET = 0.25;

  it('awards full points within the target band', () => {
    expect(scoreRound(0.25, TARGET)).toBe(WIN_POINTS);
    expect(scoreRound(0.26, TARGET)).toBe(WIN_POINTS);
  });

  it('awards near points within the near band', () => {
    expect(scoreRound(0.28, TARGET)).toBe(NEAR_POINTS);
    expect(scoreRound(0.2, TARGET)).toBe(NEAR_POINTS);
  });

  it('awards nothing for a miss', () => {
    expect(scoreRound(0.31, TARGET)).toBe(MISS_POINTS);
    expect(scoreRound(0, TARGET)).toBe(MISS_POINTS);
  });
});

describe('lorenzPoints', () => {
  it('builds cumulative share points ending at the equality corner', () => {
    const points = lorenzPoints(BASE_INCOMES_A);
    expect(points).toHaveLength(BASE_INCOMES_A.length);
    expect(points[0].x).toBe(0.1);
    expect(points[0].y).toBeCloseTo(20 / 530, 8);
    expect(points[5].x).toBe(0.6);
    expect(points[5].y).toBeCloseTo(195 / 530, 8);
    expect(points[9].x).toBe(1);
    expect(points[9].y).toBe(1);
  });

  it('reflects the redistributed post-policy distribution', () => {
    const points = lorenzPoints(afterPolicy(BASE_INCOMES_A, 0.3));
    expect(points[0].y).toBeCloseTo(29.9 / 530, 8);
    expect(points[9].y).toBe(1);
  });
});
