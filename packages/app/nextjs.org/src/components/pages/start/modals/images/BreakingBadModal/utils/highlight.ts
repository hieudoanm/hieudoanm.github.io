import { capitalize } from '@lodash/ts';
import { periodicTableSymbols } from '../constants';

export const highlightElement = (
  word: string
): { before: string[]; tile?: string; after: string[] } => {
  if (!word) return { before: [], after: [] };
  const lower = word.toLowerCase();
  let bestMatch: { idx: number; symbol: string } | null = null;

  for (const symbol of periodicTableSymbols) {
    const idx = lower.indexOf(symbol.toLowerCase());
    if (idx === -1) continue;
    if (idx === 0) {
      if (
        !bestMatch ||
        bestMatch.idx !== 0 ||
        symbol.length > bestMatch.symbol.length
      )
        bestMatch = { idx, symbol };
      continue;
    }
    if (bestMatch?.idx === 0) continue;
    if (
      !bestMatch ||
      symbol.length > bestMatch.symbol.length ||
      (symbol.length === bestMatch.symbol.length && idx < bestMatch.idx)
    )
      bestMatch = { idx, symbol };
  }

  if (!bestMatch) return { before: word.split(''), after: [] };
  const { idx, symbol } = bestMatch;
  return {
    before: word.slice(0, idx).toLowerCase().split(''),
    tile: capitalize(word.slice(idx, idx + symbol.length)),
    after: word
      .slice(idx + symbol.length)
      .toLowerCase()
      .split(''),
  };
};
