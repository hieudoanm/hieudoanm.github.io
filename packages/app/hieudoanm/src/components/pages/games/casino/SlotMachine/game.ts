import { REEL_COUNT, SYMBOLS, BET_AMOUNT } from './constants';

export const randomSymbols = (): number[] =>
  Array.from({ length: REEL_COUNT }, () =>
    Math.floor(Math.random() * SYMBOLS.length)
  );

export const calcWinnings = (indices: number[], bet: number): number => {
  const first = indices[0];
  if (indices.every((i) => i === first)) {
    return bet * SYMBOLS[first].multiplier;
  }
  if (new Set(indices).size === 2) {
    const counts = indices.reduce(
      (acc, i) => {
        acc[i] = (acc[i] || 0) + 1;
        return acc;
      },
      {} as Record<number, number>
    );
    const two = Object.entries(counts).find(([, c]) => c === 2);
    if (two) return bet * SYMBOLS[Number(two[0])].multiplier * 0.5;
  }
  return 0;
};
