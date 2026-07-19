import {
  toMonthly,
  sumRates,
  clampInsuranceBase,
  calculateTaxBreakdown,
  solveGrossFromNet,
  calculateResult,
} from '../calculator';
import {
  PERSONAL_DEDUCTION,
  DEPENDENT_DEDUCTION,
  INSURANCE_CAP,
  EMPLOYEE_INSURANCE,
  TAX_BRACKETS,
} from '../constants';

describe('toMonthly', () => {
  it('returns value unchanged for monthly period', () => {
    expect(toMonthly(10_000_000, 'monthly')).toBe(10_000_000);
  });

  it('divides by 12 for annual period', () => {
    expect(toMonthly(120_000_000, 'annual')).toBe(10_000_000);
  });
});

describe('sumRates', () => {
  it('sums all rates', () => {
    expect(sumRates(EMPLOYEE_INSURANCE)).toBeCloseTo(0.105);
  });

  it('returns 0 for empty object', () => {
    expect(sumRates({})).toBe(0);
  });
});

describe('clampInsuranceBase', () => {
  it('returns 0 when insurance disabled', () => {
    expect(clampInsuranceBase(50_000_000, false)).toBe(0);
  });

  it('returns gross when under cap', () => {
    expect(clampInsuranceBase(20_000_000, true)).toBe(20_000_000);
  });

  it('clamps to cap when over', () => {
    expect(clampInsuranceBase(50_000_000, true)).toBe(INSURANCE_CAP);
  });
});

describe('calculateTaxBreakdown', () => {
  it('returns zero tax for zero income', () => {
    const result = calculateTaxBreakdown(0);
    expect(result.totalTax).toBe(0);
    expect(result.breakdown).toHaveLength(0);
  });

  it('calculates tax for income in first bracket only', () => {
    const result = calculateTaxBreakdown(3_000_000);
    expect(result.breakdown).toHaveLength(1);
    expect(result.breakdown[0].rate).toBe(0.05);
    expect(result.breakdown[0].taxable).toBe(3_000_000);
    expect(result.totalTax).toBe(150_000);
  });

  it('calculates tax across multiple brackets', () => {
    const result = calculateTaxBreakdown(10_000_000);
    expect(result.breakdown.length).toBeGreaterThanOrEqual(2);
    expect(result.breakdown[0].rate).toBe(0.05);
    expect(result.breakdown[0].taxable).toBe(5_000_000);
    expect(result.breakdown[1].rate).toBe(0.1);
    expect(result.breakdown[1].taxable).toBe(5_000_000);
    expect(result.totalTax).toBe(250_000 + 500_000);
  });

  it('handles income exceeding all bracket limits', () => {
    const totalLimit = TAX_BRACKETS.slice(0, -1).reduce(
      (s, b) => s + b.limit,
      0
    );
    const result = calculateTaxBreakdown(totalLimit + 1_000_000);
    expect(result.breakdown.length).toBe(TAX_BRACKETS.length);
    expect(result.breakdown[TAX_BRACKETS.length - 1].rate).toBe(0.35);
  });
});

describe('solveGrossFromNet', () => {
  it('solves gross from net with no dependents', () => {
    const gross = solveGrossFromNet(10_000_000, 0, true);
    expect(gross).toBeGreaterThan(10_000_000);
  });

  it('solves gross from net with dependents', () => {
    const grossNoDeps = solveGrossFromNet(10_000_000, 0, true);
    const grossWithDeps = solveGrossFromNet(10_000_000, 2, true);
    expect(grossNoDeps).toBeGreaterThan(0);
    expect(grossWithDeps).toBeGreaterThan(0);
  });

  it('returns non-negative for zero target', () => {
    expect(solveGrossFromNet(0, 0, true)).toBeGreaterThanOrEqual(0);
  });
});

describe('calculateResult', () => {
  it('calculates gross-to-net result', () => {
    const result = calculateResult(20_000_000, 0, 'monthly', 'gross', true);
    expect(result.grossMonthly).toBe(20_000_000);
    expect(result.netMonthly).toBeLessThan(20_000_000);
    expect(result.totalTax).toBeGreaterThan(0);
    expect(result.employeeInsurance).toBeGreaterThan(0);
    expect(result.personalDeduction).toBe(PERSONAL_DEDUCTION);
    expect(result.dependentDeduction).toBe(0);
    expect(result.effectiveTaxRate).toBeGreaterThan(0);
    expect(result.totalLaborCost).toBeGreaterThan(20_000_000);
  });

  it('calculates net-to-gross result', () => {
    const result = calculateResult(15_000_000, 1, 'monthly', 'net', true);
    expect(result.grossMonthly).toBeGreaterThan(15_000_000);
    expect(result.dependentDeduction).toBe(DEPENDENT_DEDUCTION);
  });

  it('calculates annual result', () => {
    const result = calculateResult(240_000_000, 0, 'annual', 'gross', true);
    expect(result.grossMonthly).toBe(20_000_000);
  });

  it('handles insurance disabled', () => {
    const result = calculateResult(20_000_000, 0, 'monthly', 'gross', false);
    expect(result.employeeInsurance).toBe(0);
    expect(result.employerInsurance).toBe(0);
    expect(result.insuranceBase).toBe(0);
  });

  it('returns zero effective rate for zero income', () => {
    const result = calculateResult(0, 0, 'monthly', 'gross', true);
    expect(result.effectiveTaxRate).toBe(0);
  });
});
