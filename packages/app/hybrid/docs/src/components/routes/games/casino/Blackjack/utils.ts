export interface Card {
  rank: string;
  suit: string;
  value: number;
}

export const ranks = [
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
];
export const suits = ['♥', '♦', '♣', '♠'];

export const hiLoValue = (rank: string): number => {
  if (['2', '3', '4', '5', '6'].includes(rank)) return 1;
  if (['7', '8', '9'].includes(rank)) return 0;
  return -1;
};

export const newDeck = (): Card[] => {
  const deck: Card[] = [];
  for (const suit of suits)
    for (const rank of ranks) deck.push({ rank, suit, value: hiLoValue(rank) });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const isRed = (suit: string) => suit === '♥' || suit === '♦';
