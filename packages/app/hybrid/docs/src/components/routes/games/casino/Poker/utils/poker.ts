import { Card } from '../types';

let deck: Card[] = [];
const shuffle = (arr: Card[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
const freshDeck = (exclude: Card[]): Card[] => {
  const all: Card[] = [];
  for (let r = 2; r <= 14; r++)
    for (const s of ['h', 'd', 'c', 's'] as const)
      all.push({ rank: r, suit: s });
  return all.filter(
    (c) => !exclude.some((e) => e.rank === c.rank && e.suit === c.suit)
  );
};

export const handRank = (cards: Card[]): number => {
  const sorted = [...cards].sort((a, b) => b.rank - a.rank);
  const isFlush = cards.every((c) => c.suit === cards[0].suit);
  const ranks = sorted.map((c) => c.rank);
  const isStraight =
    ranks.every((r, i) => i === 0 || r === ranks[i - 1] - 1) ||
    (ranks[0] === 14 &&
      ranks[1] === 5 &&
      ranks[2] === 4 &&
      ranks[3] === 3 &&
      ranks[4] === 2);
  let rankCounts: Record<number, number> = {};
  for (const r of ranks) rankCounts[r] = (rankCounts[r] || 0) + 1;
  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  if (isFlush && isStraight && ranks[0] === 14) return 10;
  if (isFlush && isStraight) return 9;
  if (counts[0] === 4) return 8;
  if (counts[0] === 3 && counts[1] === 2) return 7;
  if (isFlush) return 6;
  if (isStraight) return 5;
  if (counts[0] === 3) return 4;
  if (counts[0] === 2 && counts[1] === 2) return 3;
  if (counts[0] === 2) return 2;
  return 1;
};

export const bestHand7 = (cards: Card[]): number => {
  let best = 0;
  for (let i = 0; i < cards.length; i++)
    for (let j = i + 1; j < cards.length; j++) {
      const five = cards.filter((_, k) => k !== i && k !== j);
      best = Math.max(best, handRank(five));
    }
  return best;
};

export const runSimulation = (
  hand: Card[],
  board: Card[],
  players: number,
  iterations: number
): { hero: number; tie: number } => {
  let hero = 0,
    tie = 0,
    used = [...hand, ...board];
  for (let i = 0; i < iterations; i++) {
    let d = shuffle(freshDeck(used));
    let heroBoard = [...board];
    while (heroBoard.length < 5 && d.length > 0) heroBoard.push(d.pop()!);
    const heroRank = bestHand7([...hand, ...heroBoard]);
    let beatAll = true,
      tied = false;
    for (let p = 0; p < players - 1; p++) {
      let villainHand = [d.pop()!, d.pop()!];
      const villainRank = bestHand7([...villainHand, ...heroBoard]);
      if (villainRank > heroRank) {
        beatAll = false;
        break;
      }
      if (villainRank === heroRank) tied = true;
    }
    if (beatAll && !tied) hero++;
    if (beatAll && tied) tie++;
  }
  return { hero, tie };
};
