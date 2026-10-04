import type { Card } from './types';

export const freshDeck = (exclude: readonly Card[]): Card[] => {
  const deck: Card[] = [];
  for (let rank = 2; rank <= 14; rank += 1) {
    for (const suit of ['h', 'd', 'c', 's'] as const) {
      if (!exclude.some((card) => card.rank === rank && card.suit === suit)) {
        deck.push({ rank, suit });
      }
    }
  }
  return deck;
};

export const shuffle = <T>(items: T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
};

/** Rank a five-card hand: 1 high card … 10 royal flush. */
export const handRank = (cards: Card[]): number => {
  const sorted = [...cards].sort((a, b) => b.rank - a.rank);
  const ranks = sorted.map((card) => card.rank);
  const isFlush = cards.every((card) => card.suit === cards[0].suit);
  const consecutive = ranks.every(
    (rank, index) => index === 0 || rank === ranks[index - 1] - 1
  );
  const wheel =
    ranks[0] === 14 &&
    ranks[1] === 5 &&
    ranks[2] === 4 &&
    ranks[3] === 3 &&
    ranks[4] === 2;
  const isStraight = consecutive || wheel;
  const counts: Record<number, number> = {};
  for (const rank of ranks) counts[rank] = (counts[rank] ?? 0) + 1;
  const groups = Object.values(counts).sort((a, b) => b - a);

  if (isFlush && isStraight && ranks[0] === 14) return 10;
  if (isFlush && isStraight) return 9;
  if (groups[0] === 4) return 8;
  if (groups[0] === 3 && groups[1] === 2) return 7;
  if (isFlush) return 6;
  if (isStraight) return 5;
  if (groups[0] === 3) return 4;
  if (groups[0] === 2 && groups[1] === 2) return 3;
  if (groups[0] === 2) return 2;
  return 1;
};

/** Best five-card rank from seven cards. */
export const bestHand7 = (cards: Card[]): number => {
  let best = 0;
  for (let first = 0; first < cards.length; first += 1) {
    for (let second = first + 1; second < cards.length; second += 1) {
      const five = cards.filter(
        (_, index) => index !== first && index !== second
      );
      best = Math.max(best, handRank(five));
    }
  }
  return best;
};

/** Monte Carlo equity of `hand` vs `players − 1` random opponents. */
export const runSimulation = (
  hand: Card[],
  board: Card[],
  players: number,
  iterations: number
): { hero: number; tie: number } => {
  const used = [...hand, ...board];
  let hero = 0;
  let tie = 0;
  for (let iteration = 0; iteration < iterations; iteration += 1) {
    const deck = shuffle(freshDeck(used));
    const fullBoard = [...board];
    while (fullBoard.length < 5) fullBoard.push(deck.pop()!);
    const heroRank = bestHand7([...hand, ...fullBoard]);
    let beatAll = true;
    let isTie = false;
    for (let opponent = 0; opponent < players - 1; opponent += 1) {
      const holeCard = deck.pop();
      const otherCard = deck.pop();
      if (!holeCard || !otherCard) break;
      const villainRank = bestHand7([holeCard, otherCard, ...fullBoard]);
      if (villainRank > heroRank) {
        beatAll = false;
        break;
      }
      if (villainRank === heroRank) isTie = true;
    }
    if (beatAll && !isTie) hero += 1;
    if (beatAll && isTie) tie += 1;
  }
  return { hero, tie };
};
