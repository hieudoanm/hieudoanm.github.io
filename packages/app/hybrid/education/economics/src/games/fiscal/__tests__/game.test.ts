import {
  closingY,
  fiscalCost,
  fiscalVerdict,
  residual,
  scoreRound,
  spendingMultiplier,
  taxCutMultiplier,
} from '../game';

describe('spendingMultiplier', () => {
  it('is 1/(1 - mpc)', () => {
    expect(spendingMultiplier(0.8)).toBeCloseTo(5);
    expect(spendingMultiplier(0.5)).toBe(2);
    expect(spendingMultiplier(0.6)).toBeCloseTo(2.5);
  });
});

describe('taxCutMultiplier', () => {
  it('is mpc/(1 - mpc) for a tax cut', () => {
    expect(taxCutMultiplier(0.8)).toBeCloseTo(4);
    expect(taxCutMultiplier(0.75)).toBe(3);
    expect(taxCutMultiplier(0.5)).toBe(1);
  });
});

describe('closingY', () => {
  it('sums spending and tax-cut contributions', () => {
    expect(closingY(20, 0, 0.8)).toBeCloseTo(100);
    expect(closingY(10, 10, 0.8)).toBeCloseTo(90);
    expect(closingY(30, 0, 0.8)).toBeCloseTo(150);
  });
});

describe('residual', () => {
  it('is signed demand minus gap', () => {
    expect(residual(20, 0, 0.8, 100)).toBeCloseTo(0);
    expect(residual(10, 10, 0.8, 100)).toBeCloseTo(-10);
    expect(residual(30, 0, 0.8, 100)).toBeCloseTo(50);
  });
});

describe('scoreRound', () => {
  it('awards 5 points for a closed gap', () => {
    expect(scoreRound(20, 0, 0.8, 100)).toBe(5);
    expect(scoreRound(21, 0, 0.8, 100)).toBe(5);
  });

  it('awards 3 points for a residual within 20', () => {
    expect(scoreRound(10, 10, 0.8, 100)).toBe(3);
  });

  it('decays to zero for large residuals', () => {
    expect(scoreRound(30, 0, 0.8, 100)).toBeCloseTo(5 - 50 / 50);
    expect(scoreRound(25, 0, 0.8, 100)).toBeCloseTo(5 - 25 / 50);
  });
});

describe('fiscalCost', () => {
  it('is G plus the tax cut', () => {
    expect(fiscalCost(20, 0)).toBe(20);
    expect(fiscalCost(10, 10)).toBe(20);
    expect(fiscalCost(0, 0)).toBe(0);
  });
});

describe('fiscalVerdict', () => {
  it('flags overshoots, under-delivery and closed gaps', () => {
    expect(fiscalVerdict(50)).toBe('overshoot');
    expect(fiscalVerdict(-10)).toBe('under');
    expect(fiscalVerdict(0)).toBe('closed');
  });
});
