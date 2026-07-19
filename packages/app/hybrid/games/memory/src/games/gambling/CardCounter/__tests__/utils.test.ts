import type { Card } from '../../_shared/cards';
import { hiLoValue, newCountingDeck, toCountingCard } from '../utils';

describe('card counter utils', () => {
  it.each([
    ['2', 1],
    ['6', 1],
    ['7', 0],
    ['9', 0],
    ['10', -1],
    ['A', -1],
    ['K', -1],
  ])('hiLoValue(%s) === %d', (rank, expected) => {
    expect(hiLoValue(rank as Card['rank'])).toBe(expected);
  });

  it('annotates cards with their counting value', () => {
    const counted = toCountingCard({ rank: '5', suit: '♥' });
    expect(counted).toEqual({ rank: '5', suit: '♥', value: 1 });
  });

  it('builds a full shuffled counting deck that sums to zero', () => {
    const deck = newCountingDeck();
    expect(deck).toHaveLength(52);
    expect(deck.reduce((sum, card) => sum + card.value, 0)).toBe(0);
  });
});
