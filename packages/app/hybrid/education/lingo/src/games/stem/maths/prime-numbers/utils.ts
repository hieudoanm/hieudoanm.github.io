export const DEFAULT_LIMIT = 120;

/** Smallest prime factor of n, or null when n is prime (or < 2). */
export const smallestPrimeFactor = (n: number): number | null => {
  if (n < 2 || n === 2) return null;
  if (n % 2 === 0) return 2;
  for (let d = 3; d * d <= n; d += 2) if (n % d === 0) return d;
  return null;
};

export const isPrime = (n: number): boolean =>
  Number.isInteger(n) && n >= 2 && smallestPrimeFactor(n) === null;

/**
 * Trial division up to √n. The bound is the whole trick: any composite n has a
 * factor at most √n, so one only ever tests 2, 3, 5, …, √n.
 */
export const trialDivisors = (n: number): number[] => {
  const limit = Math.floor(Math.sqrt(n));
  const divisors: number[] = [];
  for (let d = 2; d <= limit; d += 1) divisors.push(d);
  return divisors;
};

export const trialDivision = (
  n: number
): { divisor: number | null; prime: boolean; tested: number } => {
  if (n < 2) return { divisor: null, prime: false, tested: 0 };
  for (const d of trialDivisors(n)) {
    if (n % d === 0) return { divisor: d, prime: false, tested: d };
  }
  return { divisor: null, prime: true, tested: Math.floor(Math.sqrt(n)) };
};

export const primesUpTo = (limit: number): number[] => {
  const primes: number[] = [];
  for (let n = 2; n <= Math.floor(limit); n += 1) {
    if (isPrime(n)) primes.push(n);
  }
  return primes;
};

export interface SieveRow {
  value: number;
  prime: boolean;
  factor: number | null;
  crossed: boolean;
}

/**
 * A grid of 2…limit with composite multiples struck out, so the
 * Sieve of Eratosthenes is visible rather than asserted.
 */
export const sieveGrid = (limit: number): SieveRow[] => {
  const size = Math.max(2, Math.floor(limit));
  return Array.from({ length: size - 1 }, (_, i) => {
    const value = i + 2;
    const factor = smallestPrimeFactor(value);
    return {
      value,
      prime: factor === null,
      factor,
      crossed: factor !== null,
    };
  });
};

export interface GapRow {
  prime: number;
  previous: number | null;
  gap: number | null;
  index: number;
}

/** Prime index (1-based) alongside the gap to the previous prime. */
export const primeGaps = (limit: number): GapRow[] => {
  const primes = primesUpTo(limit);
  return primes.map((prime, i) => ({
    prime,
    previous: i > 0 ? primes[i - 1] : null,
    gap: i > 0 ? prime - primes[i - 1] : null,
    index: i + 1,
  }));
};

export const largestGapWithin = (limit: number): GapRow | null => {
  const rows = primeGaps(limit).filter(
    (row): row is GapRow & { gap: number } => row.gap !== null
  );
  if (!rows.length) return null;
  return rows.reduce((best, row) => (row.gap > best.gap ? row : best));
};

/**
 * The larger member of each twin-prime pair within the limit — primes separated
 * by exactly 2. The Twin Prime Conjecture predicts infinitely many; unproven.
 */
export const twinPrimes = (limit: number): number[] => {
  const primes = primesUpTo(limit);
  return primes.filter((p, i) => i > 0 && p - primes[i - 1] === 2);
};

export const isPerfectSquare = (n: number): boolean => {
  if (n < 0) return false;
  const root = Math.floor(Math.sqrt(n));
  return root * root === n;
};
