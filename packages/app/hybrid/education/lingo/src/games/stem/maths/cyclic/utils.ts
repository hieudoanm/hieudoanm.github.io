export const CYCLIC_NUMBER = 142857;
export const CYCLIC_DIGITS = String(CYCLIC_NUMBER).split('').map(Number);
export const MAX_MULTIPLIER = 12;

export interface CyclicProduct {
  multiplier: number;
  product: number;
  cyclicSpecial: boolean;
  permutationOffset: number;
}

export const isCyclicPermutation = (n: number): boolean => {
  const text = String(n).padStart(6, '0');
  return text.split('').sort().join('') === '124578';
};

export const getCyclicProduct = (multiplier: number): CyclicProduct => {
  const product = CYCLIC_NUMBER * multiplier;
  const cyclicSpecial = isCyclicPermutation(product);
  const firstDigit = Number(String(product)[0]);

  return {
    multiplier,
    product,
    cyclicSpecial,
    permutationOffset: cyclicSpecial ? CYCLIC_DIGITS.indexOf(firstDigit) : 0,
  };
};

export const rotateDigits = (offset: number): number[] => {
  const normalized = ((offset % 6) + 6) % 6;
  return CYCLIC_DIGITS.slice(normalized).concat(
    CYCLIC_DIGITS.slice(0, normalized)
  );
};
