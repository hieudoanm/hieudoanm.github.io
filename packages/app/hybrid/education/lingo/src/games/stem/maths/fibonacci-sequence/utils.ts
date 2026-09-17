export const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

/** The Binet "conjugate" root, (1 − √5)/2 ≈ −0.618. */
const CONJUGATE = (1 - Math.sqrt(5)) / 2;

/** F(0) = 0, F(1) = 1, F(n) = F(n−1) + F(n−2). */
export const fibonacci = (count: number): number[] => {
  const limit = Math.max(0, Math.floor(count));
  const terms: number[] = [0, 1];
  while (terms.length < limit) {
    terms.push(terms[terms.length - 1] + terms[terms.length - 2]);
  }
  return terms.slice(0, limit);
};

/** F(n+1) / F(n), undefined at n = 0 since F(0) = 0. */
export const fibonacciRatio = (n: number): number | null => {
  const denominator = fibonacci(n + 1)[n];
  if (!denominator) return null;
  return fibonacci(n + 2)[n + 1] / denominator;
};

/** Binet's closed form: (φⁿ − ψⁿ) / √5. */
export const binet = (n: number): number =>
  (Math.pow(GOLDEN_RATIO, n) - Math.pow(CONJUGATE, n)) / Math.sqrt(5);

/** F(n) is the nearest integer to φⁿ/√5 for every n ≥ 0. */
export const nearestIntegerToBinet = (n: number): number =>
  Math.round(Math.pow(GOLDEN_RATIO, n) / Math.sqrt(5));

/**
 * The Zeckendorf basis: F(2), F(3), … = 1, 2, 3, 5, 8, …
 * F(1) is excluded so the representation is unique.
 */
export const zeckendorfBasis = (): number[] => {
  const terms: number[] = [1, 2];
  while (terms[terms.length - 1] < 1e9) {
    terms.push(terms[terms.length - 1] + terms[terms.length - 2]);
  }
  return terms;
};

/**
 * Greedy Zeckendorf decomposition: every positive integer is a sum of distinct
 * non-consecutive Fibonacci numbers. Returns the chosen values, largest first.
 */
export const zeckendorf = (n: number): number[] => {
  const basis = zeckendorfBasis();
  const chosen: number[] = [];
  let remaining = Math.max(0, Math.floor(n));
  let index = basis.length - 1;

  while (remaining > 0 && index >= 0) {
    if (basis[index] <= remaining) {
      chosen.push(basis[index]);
      remaining -= basis[index];
      index -= 2; // the next term must not be adjacent
    } else {
      index -= 1;
    }
  }
  return chosen;
};

/**
 * How many further terms before the sequence at least doubles.
 * The Fibonacci sequence grows by ~1.618× per term, so this settles near 1.44 —
 * which is why F(10) = 55 needs only two more terms to pass 110.
 */
export const termsToDouble = (n: number): number => {
  const terms = fibonacci(n + 3);
  const start = terms[n] ?? 0;
  if (start === 0) return 0;
  const target = start * 2;
  let steps = 0;
  for (let m = n + 1; m < terms.length; m += 1) {
    steps += 1;
    if (terms[m] >= target) return steps;
  }
  return steps;
};

export interface GrowthPoint {
  n: number;
  value: number;
  /** log₁₀ F(n), so exponential growth plots as a straight line. */
  logValue: number;
}

/** Samples for a log-scale growth plot. */
export const growthCurve = (maxN: number): GrowthPoint[] =>
  fibonacci(maxN + 1)
    .map((value, n) => ({
      n,
      value,
      logValue: value > 0 ? Math.log10(value) : 0,
    }))
    .filter((p) => p.n >= 2);

/** |F(n) − φⁿ/√5|, the error in the nearest-integer identity. */
export const binetError = (n: number): number =>
  Math.abs(fibonacci(n + 1)[n] - nearestIntegerToBinet(n));
