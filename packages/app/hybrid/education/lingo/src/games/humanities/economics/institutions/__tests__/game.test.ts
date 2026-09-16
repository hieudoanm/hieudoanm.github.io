import {
  institutionalQuality,
  investmentRateFor,
  isTargetHit,
  growthRateFor,
  simulateYears,
  tfpFor,
} from '../game';

describe('institutionalQuality', () => {
  it('weights property rights, contracts, and stability', () => {
    expect(
      institutionalQuality({
        propertyRights: 100,
        contracts: 100,
        stability: 100,
      })
    ).toBe(1);
    expect(
      institutionalQuality({ propertyRights: 0, contracts: 0, stability: 0 })
    ).toBe(0);
  });
});

describe('tfpFor', () => {
  it('scales productivity to a base plus quality', () => {
    expect(tfpFor(0)).toBe(50);
    expect(tfpFor(1)).toBe(150);
  });
});

describe('growthRateFor', () => {
  it('returns a growth rate scaled by institutional quality', () => {
    expect(growthRateFor(0)).toBe(0.06);
    expect(growthRateFor(1)).toBe(0.18);
  });
});

describe('investmentRateFor', () => {
  it('raises the investment share as institutions improve', () => {
    expect(investmentRateFor(0)).toBe(0.05);
    expect(investmentRateFor(1)).toBe(0.3);
  });
});

describe('simulateYears', () => {
  it('produces a record for each year', () => {
    const records = simulateYears(1000, 1000, 0.5, 10);
    expect(records).toHaveLength(10);
    expect(records[0].year).toBe(1);
    expect(records[9].year).toBe(10);
  });

  it('accumulates capital with depreciation', () => {
    const records = simulateYears(1000, 1000, 0.5, 10);
    const { capital } = records[0];
    expect(capital).toBeGreaterThan(0);
    expect(records[9].gdp).toBeGreaterThan(records[0].gdp);
  });
});

describe('isTargetHit', () => {
  it('accepts values within tolerance', () => {
    expect(isTargetHit(52, 50, 10)).toBe(true);
    expect(isTargetHit(64, 50, 10)).toBe(false);
  });
});
