import {
  futureValue,
  presentValue,
  doublingTime,
  rule72,
  computeCalculatorResult,
  annuityPresentValue,
  netPresentValue,
} from '../game';

describe('futureValue', () => {
  it('computes annual compounding', () => {
    expect(futureValue(1000, 0.05, 10, 1)).toBeCloseTo(1628.89, 2);
  });

  it('computes monthly compounding', () => {
    expect(futureValue(1000, 0.05, 10, 12)).toBeCloseTo(1647.01, 2);
  });

  it('computes continuous compounding', () => {
    expect(futureValue(1000, 0.05, 10, 'continuous')).toBeCloseTo(1648.72, 2);
  });
});

describe('presentValue', () => {
  it('inverts future value', () => {
    const fv = futureValue(1000, 0.05, 10, 1);
    expect(presentValue(fv, 0.05, 10)).toBeCloseTo(1000, 2);
  });
});

describe('doublingTime', () => {
  it('is infinite for zero rate', () => {
    expect(doublingTime(0)).toBe(Infinity);
  });

  it('is about 14.2 years at 5%', () => {
    expect(doublingTime(0.05)).toBeCloseTo(14.21, 1);
  });
});

describe('rule72', () => {
  it('is infinite for zero rate', () => {
    expect(rule72(0)).toBe(Infinity);
  });

  it('is 9 years at 8%', () => {
    expect(rule72(0.08)).toBeCloseTo(9, 5);
  });
});

describe('computeCalculatorResult', () => {
  it('builds a curve through the years', () => {
    const result = computeCalculatorResult(1000, 5, 10, 1);
    expect(result.curvePoints.length).toBeGreaterThan(1);
    expect(result.curvePoints[0].value).toBe(1000);
    expect(result.doublingTime).toBeCloseTo(14.21, 1);
  });
});

describe('annuityPresentValue', () => {
  it('is payment * years at zero rate', () => {
    expect(annuityPresentValue(500, 10, 0)).toBe(5000);
  });

  it('discounts a stream at positive rate', () => {
    expect(annuityPresentValue(500, 10, 0.06)).toBeCloseTo(3680.04, 2);
  });
});

describe('netPresentValue', () => {
  it('is negative sum of discounted flows at zero rate when positive inflows', () => {
    expect(netPresentValue([-1000, 300, 400, 400, 500], 0)).toBe(600);
  });

  it('discounts future inflows at positive rate', () => {
    expect(netPresentValue([-1000, 300, 400, 400, 500], 0.05)).toBeCloseTo(
      405.41,
      2
    );
  });
});
