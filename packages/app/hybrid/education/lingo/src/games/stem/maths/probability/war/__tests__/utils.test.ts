import { playWarRound, strengthOf } from '../utils';
import type { Card } from '../../_shared/cards';

const c = (rank: string, suit: Card['suit'] = '♠'): Card =>
  ({ rank, suit }) as Card;

describe('war utils', () => {
  it('ranks ace above king', () => {
    expect(strengthOf(c('A'))).toBe(14);
    expect(strengthOf(c('K'))).toBe(13);
    expect(strengthOf(c('2'))).toBe(2);
  });

  it('returns null when the deck is too small', () => {
    expect(playWarRound([c('A'), c('K'), c('Q')])).toBeNull();
  });

  it('settles a plain higher-card win at two to one', () => {
    const deck = [
      c('9'),
      c('5'),
      c('A', '♣'),
      c('K', '♥'),
      c('Q', '♣'),
      c('J', '♣'),
      c('3', '♣'),
      c('4', '♣'),
    ];
    const round = playWarRound(deck)!;
    expect(round.wars).toBe(0);
    expect(round.result).toBe('player');
    expect(round.multiplier).toBe(2);
    expect(round.remaining).toHaveLength(6);
  });

  it('resolves a war by redrawing until ranks differ', () => {
    // tie on K, burn three (2,3,4), then A vs Q — player wins the doubled pot
    const deck = [
      c('K', '♥'),
      c('K', '♦'),
      c('2', '♣'),
      c('3', '♣'),
      c('4', '♣'),
      c('A', '♥'),
      c('Q', '♦'),
      c('9', '♠'),
      c('8', '♠'),
    ];
    const round = playWarRound(deck)!;
    expect(round.wars).toBe(1);
    expect(round.playerCard.rank).toBe('A');
    expect(round.dealerCard.rank).toBe('Q');
    expect(round.result).toBe('player');
    expect(round.multiplier).toBe(4);
  });

  it('dealer takes a war won by their redraw', () => {
    // tie on Q, burn three, then 9 vs J — dealer wins
    const deck = [
      c('Q', '♥'),
      c('Q', '♦'),
      c('2', '♣'),
      c('3', '♣'),
      c('4', '♣'),
      c('9', '♠'),
      c('J', '♠'),
      c('5', '♣'),
      c('6', '♣'),
    ];
    const round = playWarRound(deck)!;
    expect(round.wars).toBe(1);
    expect(round.playerCard.rank).toBe('9');
    expect(round.dealerCard.rank).toBe('J');
    expect(round.result).toBe('dealer');
    expect(round.multiplier).toBe(4);
  });
});
