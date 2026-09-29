/**
 * Deterministic pseudo-randomness.
 *
 * Sorting visualisers are only meaningful when re-running the same input
 * reproduces the same run, so every simulator seeds from an explicit integer
 * rather than `Math.random`.
 */

export type Rng = () => number;

/** mulberry32 — small, fast, and good enough for shuffling demo arrays. */
export const createRng = (seed: number): Rng => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Integer in [min, max], inclusive. */
export const randomInt = (rng: Rng, min: number, max: number): number =>
  Math.floor(rng() * (max - min + 1)) + min;

/**
 * An array of distinct values in [min, max], shuffled.
 *
 * Duplicates make comparisons hard to read in a visualiser, so this
 * de-duplicates by rejection rather than sorting and slicing.
 */
export const makeDistinctArray = (
  seed: number,
  size: number,
  min: number,
  max: number
): number[] => {
  const rng = createRng(seed);
  const pool: number[] = [];
  for (let v = min; v <= max && pool.length < size; v++) pool.push(v);
  const chosen: number[] = [];
  while (chosen.length < Math.min(size, pool.length)) {
    const candidate = pool[randomInt(rng, 0, pool.length - 1)];
    if (!chosen.includes(candidate)) chosen.push(candidate);
  }
  return shuffle(chosen, rng);
};

/** Fisher–Yates, returning a new array. */
export const shuffle = <T>(input: readonly T[], rng: Rng): T[] => {
  const out = [...input];
  for (let i = out.length - 1; i > 0; i--) {
    const j = randomInt(rng, 0, i);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};
