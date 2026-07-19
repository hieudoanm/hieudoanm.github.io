import { createDeck, isRedSuit, shuffle, type Card } from '../_shared/cards';
import type { CountingCard } from './types';

/** Hi-Lo counting values: low cards +1, neutral 0, high cards −1. */
export const hiLoValue = (rank: Card['rank']): number => {
  if (['2', '3', '4', '5', '6'].includes(rank)) return 1;
  if (['7', '8', '9'].includes(rank)) return 0;
  return -1;
};

export const toCountingCard = (card: Card): CountingCard => ({
  ...card,
  value: hiLoValue(card.rank),
});

export const newCountingDeck = (): CountingCard[] =>
  shuffle(createDeck()).map(toCountingCard);

export { isRedSuit };
