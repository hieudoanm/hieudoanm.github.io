import {
  isPerfectSquare,
  isPrime,
  largestGapWithin,
  primeGaps,
  primesUpTo,
  sieveGrid,
  smallestPrimeFactor,
  trialDivision,
  trialDivisors,
  twinPrimes,
} from '../utils';

describe('smallestPrimeFactor', () => {
  it('returns null for primes and for values below 2', () => {
    expect(smallestPrimeFactor(2)).toBeNull();
    expect(smallestPrimeFactor(97)).toBeNull();
    expect(smallestPrimeFactor(1)).toBeNull();
    expect(smallestPrimeFactor(0)).toBeNull();
  });

  it('finds the smallest factor of a composite', () => {
    expect(smallestPrimeFactor(9)).toBe(3);
    expect(smallestPrimeFactor(49)).toBe(7);
    expect(smallestPrimeFactor(91)).toBe(7);
  });
});

describe('isPrime', () => {
  it('accepts primes and rejects everything else', () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(4)).toBe(false);
    expect(isPrime(9)).toBe(false);
  });

  it('rejects non-integers', () => {
    expect(isPrime(2.5)).toBe(false);
    expect(isPrime(Number.NaN)).toBe(false);
  });
});

describe('trialDivisors', () => {
  it('stops at the square root, not at n', () => {
    // sqrt(49) = 7, so d = 2…7 inclusive.
    expect(trialDivisors(49)).toEqual([2, 3, 4, 5, 6, 7]);
    expect(trialDivisors(100)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});

describe('trialDivision', () => {
  it('reports the factor and where it stopped', () => {
    expect(trialDivision(91)).toEqual({ divisor: 7, prime: false, tested: 7 });
  });

  it('marks a prime and records the full square-root sweep', () => {
    expect(trialDivision(97)).toEqual({
      divisor: null,
      prime: true,
      tested: 9,
    });
  });

  it('treats values below 2 as not prime', () => {
    expect(trialDivision(1)).toEqual({
      divisor: null,
      prime: false,
      tested: 0,
    });
  });
});

describe('primesUpTo', () => {
  it('lists the primes in order', () => {
    expect(primesUpTo(30)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  });
});

describe('sieveGrid', () => {
  it('covers 2 through the limit inclusive', () => {
    const grid = sieveGrid(10);
    expect(grid.map((r) => r.value)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it('marks primes and crosses out composites with their factor', () => {
    const grid = sieveGrid(12);
    const nine = grid.find((r) => r.value === 9);
    const eleven = grid.find((r) => r.value === 11);
    expect(nine).toMatchObject({ prime: false, factor: 3, crossed: true });
    expect(eleven).toMatchObject({ prime: true, factor: null, crossed: false });
  });

  it('clamps a tiny limit up to 2', () => {
    expect(sieveGrid(1).map((r) => r.value)).toEqual([2]);
  });
});

describe('primeGaps', () => {
  it('reports the gap to the previous prime and a 1-based index', () => {
    const rows = primeGaps(13);
    expect(rows[0]).toEqual({ prime: 2, previous: null, gap: null, index: 1 });
    expect(rows.at(-1)).toEqual({
      prime: 13,
      previous: 11,
      gap: 2,
      index: 6,
    });
  });
});

describe('largestGapWithin', () => {
  it('finds the biggest gap below the limit', () => {
    // Primes ≤ 25: 2 3 5 7 11 13 17 19 23 — the largest gap is 4, and ties
    // resolve to the first occurrence (7 → 11).
    expect(largestGapWithin(25)).toMatchObject({
      prime: 11,
      previous: 7,
      gap: 4,
    });
  });

  it('returns null when there is only one prime to compare', () => {
    expect(largestGapWithin(2)).toBeNull();
  });
});

describe('twinPrimes', () => {
  it('returns the larger member of each twin pair', () => {
    expect(twinPrimes(30)).toEqual([5, 7, 13, 19]);
  });

  it('returns an empty list when no pairs exist in range', () => {
    expect(twinPrimes(4)).toEqual([]);
  });
});

describe('isPerfectSquare', () => {
  it('detects perfect squares', () => {
    expect(isPerfectSquare(100)).toBe(true);
    expect(isPerfectSquare(101)).toBe(false);
    expect(isPerfectSquare(-4)).toBe(false);
  });
});
