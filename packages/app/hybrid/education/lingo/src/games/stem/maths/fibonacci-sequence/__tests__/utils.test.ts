import {
  GOLDEN_RATIO,
  binet,
  binetError,
  fibonacci,
  fibonacciRatio,
  growthCurve,
  nearestIntegerToBinet,
  termsToDouble,
  zeckendorf,
  zeckendorfBasis,
} from '../utils';

describe('fibonacci', () => {
  it('starts 0, 1 and adds the previous two terms', () => {
    expect(fibonacci(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  it('returns an empty array for a non-positive count', () => {
    expect(fibonacci(0)).toEqual([]);
    expect(fibonacci(-3)).toEqual([]);
  });
});

describe('fibonacciRatio', () => {
  it('returns null at n = 0 because F(0) = 0', () => {
    expect(fibonacciRatio(0)).toBeNull();
  });

  it('returns F(n+1)/F(n)', () => {
    expect(fibonacciRatio(5)).toBeCloseTo(8 / 5, 10);
    expect(fibonacciRatio(9)).toBeCloseTo(55 / 34, 10);
  });

  it('converges on the golden ratio', () => {
    expect(fibonacciRatio(20)).toBeCloseTo(GOLDEN_RATIO, 6);
  });
});

describe('binet', () => {
  it('reproduces the sequence through the closed form', () => {
    for (let n = 0; n < 20; n += 1) {
      expect(binet(n)).toBeCloseTo(fibonacci(n + 1)[n], 6);
    }
  });

  it('rounds phi^n/sqrt(5) to F(n) exactly', () => {
    for (let n = 0; n < 30; n += 1) {
      expect(nearestIntegerToBinet(n)).toBe(fibonacci(n + 1)[n]);
      expect(binetError(n)).toBe(0);
    }
  });
});

describe('zeckendorfBasis', () => {
  it('excludes F(1) so the representation is unique', () => {
    const basis = zeckendorfBasis();
    expect(basis.slice(0, 6)).toEqual([1, 2, 3, 5, 8, 13]);
  });
});

describe('zeckendorf', () => {
  it('represents 0 as the empty sum', () => {
    expect(zeckendorf(0)).toEqual([]);
  });

  it('decomposes numbers into non-consecutive terms', () => {
    expect(zeckendorf(100)).toEqual([89, 8, 3]);
    expect(zeckendorf(1)).toEqual([1]);
    expect(zeckendorf(4)).toEqual([3, 1]);
  });

  it('sums back to the original for every value up to 500', () => {
    for (let n = 1; n <= 500; n += 1) {
      const parts = zeckendorf(n);
      expect(parts.reduce((a, b) => a + b, 0)).toBe(n);
    }
  });

  it('never picks two adjacent basis terms', () => {
    const basis = zeckendorfBasis();
    for (let n = 1; n <= 2000; n += 1) {
      // Terms come back largest-first, so indices descend.
      const indices = zeckendorf(n).map((p) => basis.indexOf(p));
      indices.forEach((index, i) => {
        if (i > 0) {
          expect(Math.abs(index - indices[i - 1])).toBeGreaterThanOrEqual(2);
        }
      });
    }
  });
});

describe('termsToDouble', () => {
  it('is zero at the start of the sequence', () => {
    expect(termsToDouble(0)).toBe(0);
  });

  it('returns 1 when the very next term already doubles F(n)', () => {
    // F(2) = 1, F(3) = 2 — one term is enough.
    expect(termsToDouble(2)).toBe(1);
  });

  it('reports two terms when the next step is not yet enough', () => {
    // F(10) = 55 needs F(12) = 144 to pass 110.
    expect(termsToDouble(10)).toBe(2);
  });

  it('only ever needs one or two terms, since growth is ~1.618x', () => {
    for (let n = 1; n <= 60; n += 1) {
      const steps = termsToDouble(n);
      expect(steps).toBeGreaterThanOrEqual(1);
      expect(steps).toBeLessThanOrEqual(2);
    }
  });
});

describe('growthCurve', () => {
  it('samples log-scaled points from n = 2 onwards', () => {
    const curve = growthCurve(10);
    expect(curve[0].n).toBe(2);
    expect(curve.at(-1)?.n).toBe(10);
  });

  it('logs F(n) so exponential growth is linear', () => {
    const [point] = growthCurve(3);
    expect(point.logValue).toBeCloseTo(Math.log10(1), 10);
  });
});
