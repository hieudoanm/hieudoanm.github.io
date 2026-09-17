import {
  equilibriumOutput,
  outputGap,
  plannedExpenditure,
  requiredDeltaG,
  scoreRound,
  spendingMultiplier,
  unplannedInventory,
  verdictFor,
} from '../game';

describe('spendingMultiplier', () => {
  it('is 1/(1 - mpc)', () => {
    expect(spendingMultiplier(0.8)).toBeCloseTo(5);
    expect(spendingMultiplier(0.5)).toBe(2);
    expect(spendingMultiplier(0.9)).toBeCloseTo(10);
  });
});

describe('plannedExpenditure', () => {
  it('is a + mpc*Y + I + G', () => {
    expect(plannedExpenditure(40, 0.8, 20, 40, 500)).toBe(500);
    expect(plannedExpenditure(40, 0.8, 20, 40, 0)).toBe(100);
  });
});

describe('equilibriumOutput', () => {
  it('is (a + I + G)/(1 - mpc)', () => {
    expect(equilibriumOutput(40, 0.8, 20, 40)).toBeCloseTo(500);
    expect(equilibriumOutput(70, 0.5, 30, 0)).toBe(200);
  });
});

describe('outputGap', () => {
  it('is target output minus equilibrium output', () => {
    expect(outputGap(40, 0.8, 20, 40, 600)).toBeCloseTo(100);
    expect(outputGap(40, 0.8, 20, 40, 400)).toBeCloseTo(-100);
  });
});

describe('requiredDeltaG', () => {
  it('is the gap times (1 - mpc)', () => {
    expect(requiredDeltaG(40, 0.8, 20, 40, 600)).toBeCloseTo(20);
    expect(requiredDeltaG(90, 0.5, 30, 10, 360)).toBe(50);
  });
});

describe('unplannedInventory', () => {
  it('is actual output minus planned expenditure', () => {
    expect(unplannedInventory(40, 0.8, 20, 60, 600)).toBe(0);
    expect(unplannedInventory(40, 0.8, 20, 40, 600)).toBe(20);
  });
});

describe('verdictFor', () => {
  it('flags closed, overshoot and under cases', () => {
    expect(verdictFor(20, 20)).toBe('closed');
    expect(verdictFor(19, 20)).toBe('closed');
    expect(verdictFor(22, 20)).toBe('overshoot');
    expect(verdictFor(18, 20)).toBe('under');
  });
});

describe('scoreRound', () => {
  it('awards full marks for a closed gap', () => {
    expect(scoreRound(20, 20)).toBe(5);
    expect(scoreRound(19, 20)).toBe(5);
  });

  it('awards partial marks for a near miss', () => {
    expect(scoreRound(18, 20)).toBe(3);
    expect(scoreRound(15, 20)).toBe(3);
  });

  it('decays for large misses', () => {
    expect(scoreRound(14, 20)).toBeCloseTo(4.9);
    expect(scoreRound(0, 20)).toBeCloseTo(3.5);
  });
});
