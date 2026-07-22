import { Card, DECK_COUNT, RANKS, SUITS } from './constants';

export const createDeck = (): Card[] =>
  Array.from({ length: DECK_COUNT }, () =>
    SUITS.flatMap((suit) => RANKS.map((rank) => ({ rank, suit })))
  ).flat();

export const shuffle = (deck: Card[]): Card[] => {
  const d = [...deck];
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]];
  }
  return d;
};

export const cardValue = (card: Card): number => {
  if (card.rank === 'A') return 1;
  if (['J', 'Q', 'K'].includes(card.rank)) return 0;
  return parseInt(card.rank, 10);
};

export const handValue = (cards: Card[]): number =>
  cards.reduce((sum, c) => sum + cardValue(c), 0) % 10;

export const shouldDrawThird = (hand: Card[], isPlayer: boolean): boolean => {
  const val = handValue(hand);
  if (hand.length === 2) {
    if (isPlayer) return val <= 5;
    return val <= 2;
  }
  return false;
};

export const playerDrawRule = (playerVal: number): boolean => playerVal <= 5;

export const bankerDrawRule = (
  bankerVal: number,
  playerThirdCard?: Card
): boolean => {
  if (bankerVal <= 2) return true;
  if (bankerVal === 3)
    return playerThirdCard ? cardValue(playerThirdCard) !== 8 : true;
  if (bankerVal === 4)
    return playerThirdCard
      ? [2, 3, 4, 5, 6, 7].includes(cardValue(playerThirdCard))
      : true;
  if (bankerVal === 5)
    return playerThirdCard
      ? [4, 5, 6, 7].includes(cardValue(playerThirdCard))
      : true;
  if (bankerVal === 6)
    return playerThirdCard
      ? [6, 7].includes(cardValue(playerThirdCard))
      : false;
  return false;
};
