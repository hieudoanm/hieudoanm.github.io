import {
  CYCLIC_DIGITS,
  CYCLIC_NUMBER,
  MAX_MULTIPLIER,
  getCyclicProduct,
  isCyclicPermutation,
  rotateDigits,
} from '../utils';

describe('cyclic number utils', () => {
  it('defines 142857', () => {
    expect(CYCLIC_NUMBER).toBe(142857);
    expect(CYCLIC_DIGITS).toEqual([1, 4, 2, 8, 5, 7]);
    expect(MAX_MULTIPLIER).toBeGreaterThanOrEqual(12);
  });

  it.each([
    [1, 142857, true, 0],
    [2, 285714, true, 2],
    [3, 428571, true, 1],
    [4, 571428, true, 4],
    [5, 714285, true, 5],
    [6, 857142, true, 3],
  ] as const)(
    'multiplying %i produces the cyclic permutation %i',
    (multiplier, product, cyclicSpecial, offset) => {
      const r = getCyclicProduct(multiplier);
      expect(r.product).toBe(product);
      expect(r.cyclicSpecial).toBe(cyclicSpecial);
      expect(r.permutationOffset).toBe(offset);
    }
  );

  it('multiplying by 7 yields 999999 and leaves the cycle', () => {
    const r = getCyclicProduct(7);
    expect(r.product).toBe(999999);
    expect(r.cyclicSpecial).toBe(false);
  });

  it('grows the product beyond the single cycle', () => {
    const r = getCyclicProduct(MAX_MULTIPLIER);
    expect(r.product).toBe(142857 * MAX_MULTIPLIER);
  });

  it('recognises any rotation as a cyclic permutation', () => {
    for (const n of [142857, 285714, 428571, 571428, 714285, 857142]) {
      expect(isCyclicPermutation(n)).toBe(true);
    }
    expect(isCyclicPermutation(999999)).toBe(false);
    expect(isCyclicPermutation(123456)).toBe(false);
  });

  it('rotates the digit sequence around the ring', () => {
    expect(rotateDigits(0)).toEqual([1, 4, 2, 8, 5, 7]);
    expect(rotateDigits(2)).toEqual([2, 8, 5, 7, 1, 4]);
    expect(rotateDigits(3)).toEqual([8, 5, 7, 1, 4, 2]);
    expect(rotateDigits(-1)).toEqual([7, 1, 4, 2, 8, 5]);
    expect(rotateDigits(6)).toEqual([1, 4, 2, 8, 5, 7]);
    expect(rotateDigits(5)).toEqual([7, 1, 4, 2, 8, 5]);
  });
});
