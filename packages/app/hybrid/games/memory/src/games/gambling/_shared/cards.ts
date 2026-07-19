export const SUITS = ['♠', '♥', '♦', '♣'] as const;

export type Suit = (typeof SUITS)[number];

export const RANKS = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
] as const;

export type Rank = (typeof RANKS)[number];

export interface Card {
  rank: Rank;
  suit: Suit;
}

export const createDeck = (): Card[] =>
  SUITS.flatMap((suit) => RANKS.map((rank) => ({ rank, suit })));

/** Fisher-Yates shuffle returning a new array. */
export const shuffle = <T>(items: readonly T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
};

export const isRedSuit = (suit: Suit): boolean => suit === '♥' || suit === '♦';

export const drawCard = (deck: Card[]): [Card, Card[]] => [
  deck[0],
  deck.slice(1),
];
