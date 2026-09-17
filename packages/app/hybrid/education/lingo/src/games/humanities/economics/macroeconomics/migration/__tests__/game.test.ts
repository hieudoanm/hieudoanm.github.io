import {
  computeEquilibriumWage,
  computeGDPGain,
  computeImmigrantSurplus,
  computeNPV,
  evaluateDecision,
  generateQuizParams,
  judgeQuizAnswer,
  shouldMove,
  simulateMacro,
} from '../game';

describe('computeNPV', () => {
  it('discounts the expected wage gap over the horizon minus the moving cost', () => {
    const npv = computeNPV(30000, 55000, 0.85, 5000);
    const expected = -5000;
    let sum = 0;
    for (let t = 0; t < 10; t++) {
      sum += ((55000 - 30000) * 0.85) / Math.pow(1.06, t);
    }
    expect(npv).toBeCloseTo(expected + sum, 6);
  });

  it('is negative when the destination offers no premium', () => {
    expect(computeNPV(40000, 40000, 1, 2000)).toBeLessThan(0);
  });
});

describe('shouldMove', () => {
  it('moves only when the NPV is strictly positive', () => {
    expect(shouldMove(100)).toBe(true);
    expect(shouldMove(0)).toBe(false);
    expect(shouldMove(-5)).toBe(false);
  });
});

describe('evaluateDecision', () => {
  it('computes expected incomes and a consistent verdict', () => {
    const result = evaluateDecision(30000, 60000, 5000, 0.9);
    expect(result.expectedIncomeMove).toBe(54000);
    expect(result.expectedIncomeStay).toBe(30000);
    expect(result.shouldMove).toBe(result.npv > 0);
  });
});

describe('computeEquilibriumWage', () => {
  it('never drops below the origin wage', () => {
    expect(
      computeEquilibriumWage(30000, 40000, 5, 90, 120)
    ).toBeGreaterThanOrEqual(30000);
  });

  it('falls as migrant supply exceeds labor demand', () => {
    const low = computeEquilibriumWage(30000, 40000, 5, 100, 120);
    const high = computeEquilibriumWage(30000, 40000, 50, 100, 120);
    expect(high).toBeLessThanOrEqual(low);
  });
});

describe('computeImmigrantSurplus', () => {
  it('is zero without migrants', () => {
    expect(computeImmigrantSurplus(40000, 45000, 0)).toBe(0);
  });

  it('scales with the wage gap per migrant', () => {
    expect(computeImmigrantSurplus(40000, 45000, 10)).toBe(50000);
  });
});

describe('computeGDPGain', () => {
  it('adds the per-worker output gain', () => {
    expect(computeGDPGain(10, 42000, 30000)).toBe(120000);
  });
});

describe('simulateMacro', () => {
  it('reports equilibrium wage, surplus and GDP gain', () => {
    const snapshot = simulateMacro(30000, 50000, 20, 100, 120);
    expect(snapshot.migrantCount).toBe(20);
    expect(snapshot.equilibriumWage).toBe(snapshot.nativeWage);
    expect(snapshot.immigrantSurplus).toBeGreaterThanOrEqual(0);
    expect(snapshot.gdpGain).toBeGreaterThanOrEqual(0);
  });
});

describe('generateQuizParams', () => {
  it('draws parameters within the configured ranges', () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    const params = generateQuizParams();
    expect(params.w0).toBeGreaterThanOrEqual(20000);
    expect(params.w0).toBeLessThanOrEqual(50000);
    expect(params.w1).toBeGreaterThanOrEqual(30000);
    expect(params.w1).toBeLessThanOrEqual(80000);
    expect(params.m).toBeGreaterThanOrEqual(2000);
    expect(params.m).toBeLessThanOrEqual(15000);
    expect(params.p).toBeGreaterThanOrEqual(0.7);
    expect(params.p).toBeLessThanOrEqual(1);
    jest.restoreAllMocks();
  });
});

describe('judgeQuizAnswer', () => {
  it('marks a move correct only when the NPV is positive', () => {
    expect(judgeQuizAnswer('move', 30000, 70000, 3000, 1).correct).toBe(true);
    expect(judgeQuizAnswer('stay', 30000, 70000, 3000, 1).correct).toBe(false);
    expect(judgeQuizAnswer('stay', 30000, 31000, 14000, 0.7).correct).toBe(
      true
    );
  });

  it('returns the computed NPV', () => {
    const { npv } = judgeQuizAnswer('move', 30000, 70000, 3000, 1);
    expect(npv).toBeCloseTo(computeNPV(30000, 70000, 1, 3000), 6);
  });
});
