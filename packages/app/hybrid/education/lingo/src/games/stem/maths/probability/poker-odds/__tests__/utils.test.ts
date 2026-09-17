import type { Card } from '../types';
import {
  bestHand7,
  freshDeck,
  handRank,
  runSimulation,
  shuffle,
} from '../utils';

const c = (rank: number, suit: Card['suit']): Card => ({ rank, suit });

describe('poker odds utils', () => {
  it('freshDeck excludes used cards', () => {
    const deck = freshDeck([c(14, 's'), c(2, 'h')]);
    expect(deck).toHaveLength(50);
    expect(deck.some((card) => card.rank === 14 && card.suit === 's')).toBe(
      false
    );
  });

  it('shuffle preserves all elements', () => {
    const deck = freshDeck([]);
    expect(shuffle(deck)).toHaveLength(52);
  });

  it.each([
    [
      'royal flush',
      [c(14, 's'), c(13, 's'), c(12, 's'), c(11, 's'), c(10, 's')],
      10,
    ],
    [
      'straight flush',
      [c(9, 'h'), c(8, 'h'), c(7, 'h'), c(6, 'h'), c(5, 'h')],
      9,
    ],
    [
      'four of a kind',
      [c(7, 's'), c(7, 'h'), c(7, 'd'), c(7, 'c'), c(2, 's')],
      8,
    ],
    [
      'full house',
      [c(13, 's'), c(13, 'h'), c(13, 'd'), c(2, 'c'), c(2, 's')],
      7,
    ],
    ['flush', [c(14, 'd'), c(12, 'd'), c(9, 'd'), c(5, 'd'), c(3, 'd')], 6],
    ['straight', [c(9, 'c'), c(8, 'd'), c(7, 'h'), c(6, 's'), c(5, 'c')], 5],
    [
      'wheel straight',
      [c(14, 'c'), c(5, 'd'), c(4, 'h'), c(3, 's'), c(2, 'c')],
      5,
    ],
    [
      'three of a kind',
      [c(8, 's'), c(8, 'h'), c(8, 'd'), c(4, 'c'), c(2, 's')],
      4,
    ],
    ['two pair', [c(11, 's'), c(11, 'h'), c(4, 'd'), c(4, 'c'), c(9, 's')], 3],
    ['one pair', [c(6, 's'), c(6, 'h'), c(12, 'd'), c(7, 'c'), c(3, 's')], 2],
    ['high card', [c(14, 'c'), c(11, 'd'), c(8, 'h'), c(6, 's'), c(3, 'c')], 1],
  ])('handRank(%s) === %i', (_name, cards, expected) => {
    expect(handRank(cards)).toBe(expected);
  });

  it('finds the best five-card hand out of seven', () => {
    const seven = [
      c(14, 's'),
      c(13, 's'),
      c(12, 's'),
      c(11, 's'),
      c(10, 's'),
      c(2, 'h'),
      c(3, 'd'),
    ];
    expect(bestHand7(seven)).toBe(10);
  });

  it('runs a Monte Carlo simulation within bounds', () => {
    const hand = [c(14, 's'), c(14, 'h')];
    const board = [c(7, 'd'), c(9, 'c'), c(2, 's')];
    const { hero, tie } = runSimulation(hand, board, 2, 60);
    expect(hero + tie).toBeLessThanOrEqual(60);
    expect(hero + tie).toBeGreaterThan(0);
  });
});
