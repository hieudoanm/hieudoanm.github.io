import { Claim, MythFactItem } from '../types';

export const shuffle = <T>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = copy[i] ?? null;
    copy[i] = copy[j] ?? copy[i];
    copy[j] = tmp ?? copy[j];
  }
  return copy;
};

export const buildDeck = (
  items: MythFactItem[],
  count: number
): MythFactItem[] => shuffle(items).slice(0, count);

export const correctGuess = (item: MythFactItem): Claim =>
  item.isTrue ? 'fact' : 'myth';

export const isCorrectGuess = (item: MythFactItem, guess: Claim): boolean =>
  guess === correctGuess(item);

export const formatAccuracy = (correct: number, total: number): string => {
  if (total === 0) return '0%';
  return `${Math.round((correct / total) * 100)}%`;
};
