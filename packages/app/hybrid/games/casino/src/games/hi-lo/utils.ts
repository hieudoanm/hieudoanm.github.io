import { createDeck, drawCard, shuffle, type Card } from '../_shared/cards';
import type { HiLoGuess } from './types';

/** Rank strength 2..14 (Ace high). */
export const rankStrength = (card: Card): number => {
  if (card.rank === 'A') return 14;
  if (card.rank === 'K') return 13;
  if (card.rank === 'Q') return 12;
  if (card.rank === 'J') return 11;
  return parseInt(card.rank, 10);
};

/** Ties lose — the guess must be strictly higher or lower. */
export const isGuessCorrect = (
  guess: HiLoGuess,
  current: Card,
  next: Card
): boolean =>
  guess === 'higher'
    ? rankStrength(next) > rankStrength(current)
    : rankStrength(next) < rankStrength(current);

export const freshShuffledDeck = (): Card[] => shuffle(createDeck());

export const dealFrom = (deck: Card[]): [Card, Card, Card[]] => {
  const [first, afterFirst] = drawCard(deck);
  const [second, afterSecond] = drawCard(afterFirst);
  return [first, second, afterSecond];
};
