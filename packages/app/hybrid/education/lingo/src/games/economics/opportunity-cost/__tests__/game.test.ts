import {
  calcExpectedBusinessIncome,
  calcNetBenefit,
  calcOpportunityCost,
  calcSandbox,
} from '../game';

describe('calcExpectedBusinessIncome', () => {
  it('returns (1 - risk) * income rounded', () => {
    expect(calcExpectedBusinessIncome(300, 0.3)).toBe(210);
    expect(calcExpectedBusinessIncome(1000, 0)).toBe(1000);
    expect(calcExpectedBusinessIncome(500, 1)).toBe(0);
  });
});

describe('calcOpportunityCost', () => {
  it('returns wages * hours', () => {
    expect(calcOpportunityCost(18, 10)).toBe(180);
    expect(calcOpportunityCost(25, 8)).toBe(200);
  });
});

describe('calcNetBenefit', () => {
  it('subtracts OC and upfront cost from expected income', () => {
    expect(calcNetBenefit(210, 180, 50)).toBe(-20);
    expect(calcNetBenefit(500, 100, 50)).toBe(350);
  });
});

describe('calcSandbox', () => {
  it('aggregates all sandbox values', () => {
    const result = calcSandbox({
      wages: 18,
      hours: 10,
      businessIncome: 300,
      upfrontCost: 50,
      risk: 0.3,
    });
    expect(result).toEqual({
      expectedBusinessIncome: 210,
      opportunityCost: 180,
      netBenefit: -20,
    });
  });
});
