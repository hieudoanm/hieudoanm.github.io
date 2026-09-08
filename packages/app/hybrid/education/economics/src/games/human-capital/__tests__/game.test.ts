import {
  annualWage,
  npv,
  optimalYears,
  pvCost,
  pvEarnings,
  scoreForChoice,
} from '../game';

describe('annualWage', () => {
  it('pays the base wage with zero schooling', () => {
    expect(annualWage(0, 30000)).toBe(30000);
  });

  it('grows exponentially at the 8% rate of return', () => {
    expect(annualWage(8, 30000)).toBeCloseTo(55527.9, 0);
    expect(annualWage(16, 30000)).toBeCloseTo(102778.3, 0);
  });
});

describe('pvEarnings', () => {
  it('discounts a 40-year career earning the base wage', () => {
    expect(pvEarnings(0, 30000, 8)).toBeCloseTo(386357.47, 0);
    expect(pvEarnings(0, 30000, 4)).toBeCloseTo(617534.55, 0);
  });

  it('delays earnings by the years of schooling', () => {
    expect(pvEarnings(8, 30000, 8)).toBeCloseTo(386357.47, 0);
    expect(pvEarnings(8, 30000, 8)).toBeLessThan(
      pvEarnings(0, annualWage(8, 30000), 8)
    );
  });
});

describe('pvCost', () => {
  it('charges the cost per year times the years of schooling', () => {
    expect(pvCost(0, 5000)).toBe(0);
    expect(pvCost(10, 5000)).toBe(50000);
    expect(pvCost(16, 12000)).toBe(192000);
  });
});

describe('npv', () => {
  it('subtracts the present value of cost from earnings', () => {
    expect(npv(8, 30000, 8, 5000)).toBeCloseTo(
      pvEarnings(8, 30000, 8) - pvCost(8, 5000),
      6
    );
  });

  it('is lower when the discount rate is high', () => {
    expect(npv(16, 30000, 8, 5000)).toBeLessThan(npv(16, 30000, 4, 5000));
  });
});

describe('optimalYears', () => {
  it.each([
    [30000, 4, 5000, 16],
    [30000, 6, 10000, 16],
    [30000, 8, 5000, 0],
    [50000, 4, 12000, 16],
    [40000, 10, 15000, 0],
  ] as [number, number, number, number][])(
    'finds the NPV-maximizing years for w0=%i, r=%i, cost=%i',
    (w0, r, cost, expected) => {
      expect(optimalYears(w0, r, cost)).toBe(expected);
    }
  );
});

describe('scoreForChoice', () => {
  it('awards a perfect score for the optimal choice', () => {
    expect(scoreForChoice(16, 16)).toBe(100);
  });

  it('penalizes distance from the optimal years', () => {
    expect(scoreForChoice(14, 16)).toBe(60);
    expect(scoreForChoice(0, 16)).toBe(0);
  });
});
