import { createDeck, drawCard, type Card, type Rank } from '../_shared/cards';
import type { WarRound } from './types';

export const RANK_STRENGTH: Record<Rank, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  '10': 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
};

/** Minimum cards needed per side: one face-up plus three burn cards per war. */
export const MIN_DECK = 8;

export const strengthOf = (card: Card): number => RANK_STRENGTH[card.rank];

/**
 * Plays a full round, resolving wars by burning three cards and drawing
 * again until ranks differ. Pure — consumes a copy of the deck slice.
 */
export const playWarRound = (deck: Card[]): WarRound | null => {
  if (deck.length < MIN_DECK) return null;
  let rest = [...deck];
  let playerCard: Card;
  let dealerCard: Card;
  [playerCard, rest] = drawCard(rest);
  [dealerCard, rest] = drawCard(rest);

  let wars = 0;
  while (
    strengthOf(playerCard) === strengthOf(dealerCard) &&
    rest.length >= 2
  ) {
    wars += 1;
    for (let burn = 0; burn < 3 && rest.length > 2; burn += 1) {
      [, rest] = drawCard(rest);
    }
    [playerCard, rest] = drawCard(rest);
    [dealerCard, rest] = drawCard(rest);
  }

  const result =
    strengthOf(playerCard) >= strengthOf(dealerCard) ? 'player' : 'dealer';
  return {
    playerCard,
    dealerCard,
    wars,
    result,
    multiplier: 2 ** (wars + 1),
    remaining: rest,
  };
};
