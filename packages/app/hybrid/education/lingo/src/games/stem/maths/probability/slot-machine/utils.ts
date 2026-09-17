import { BET_AMOUNT, REEL_COUNT, SYMBOLS } from './constants';

export const randomSymbols = (): number[] =>
  Array.from({ length: REEL_COUNT }, () =>
    Math.floor(Math.random() * SYMBOLS.length)
  );

export const calcWinnings = (indices: number[], bet = BET_AMOUNT): number => {
  const first = indices[0];
  if (indices.every((index) => index === first)) {
    return bet * SYMBOLS[first].multiplier;
  }
  if (new Set(indices).size === 2) {
    const counts: Record<number, number> = {};
    for (const index of indices) counts[index] = (counts[index] ?? 0) + 1;
    const pair = Object.entries(counts).find(([, count]) => count === 2);
    if (pair) return bet * SYMBOLS[Number(pair[0])].multiplier * 0.5;
  }
  return 0;
};
