import { handRank, bestHand7, runSimulation } from '../poker';
import { Card } from '../../types';

const card = (rank: number, suit: 'h' | 'd' | 'c' | 's'): Card => ({
  rank,
  suit,
});

describe('handRank', () => {
  it('returns 10 for royal flush', () => {
    expect(
      handRank([
        card(14, 'h'),
        card(13, 'h'),
        card(12, 'h'),
        card(11, 'h'),
        card(10, 'h'),
      ])
    ).toBe(10);
  });

  it('returns 9 for straight flush', () => {
    expect(
      handRank([
        card(9, 's'),
        card(8, 's'),
        card(7, 's'),
        card(6, 's'),
        card(5, 's'),
      ])
    ).toBe(9);
  });

  it('returns 8 for four of a kind', () => {
    expect(
      handRank([
        card(5, 'h'),
        card(5, 'd'),
        card(5, 'c'),
        card(5, 's'),
        card(9, 'h'),
      ])
    ).toBe(8);
  });

  it('returns 7 for full house', () => {
    expect(
      handRank([
        card(3, 'h'),
        card(3, 'd'),
        card(3, 'c'),
        card(7, 's'),
        card(7, 'h'),
      ])
    ).toBe(7);
  });

  it('returns 6 for flush', () => {
    expect(
      handRank([
        card(14, 'c'),
        card(10, 'c'),
        card(8, 'c'),
        card(5, 'c'),
        card(3, 'c'),
      ])
    ).toBe(6);
  });

  it('returns 5 for straight', () => {
    expect(
      handRank([
        card(9, 'h'),
        card(8, 'd'),
        card(7, 'c'),
        card(6, 's'),
        card(5, 'h'),
      ])
    ).toBe(5);
  });

  it('returns 4 for three of a kind', () => {
    expect(
      handRank([
        card(10, 'h'),
        card(10, 'd'),
        card(10, 'c'),
        card(4, 's'),
        card(2, 'h'),
      ])
    ).toBe(4);
  });

  it('returns 3 for two pair', () => {
    expect(
      handRank([
        card(9, 'h'),
        card(9, 'd'),
        card(5, 'c'),
        card(5, 's'),
        card(2, 'h'),
      ])
    ).toBe(3);
  });

  it('returns 2 for one pair', () => {
    expect(
      handRank([
        card(8, 'h'),
        card(8, 'd'),
        card(6, 'c'),
        card(4, 's'),
        card(2, 'h'),
      ])
    ).toBe(2);
  });

  it('returns 1 for high card', () => {
    expect(
      handRank([
        card(14, 'h'),
        card(10, 'd'),
        card(7, 'c'),
        card(4, 's'),
        card(2, 'h'),
      ])
    ).toBe(1);
  });

  it('detects low ace straight (A-2-3-4-5)', () => {
    expect(
      handRank([
        card(14, 'h'),
        card(2, 'd'),
        card(3, 'c'),
        card(4, 's'),
        card(5, 'h'),
      ])
    ).toBe(5);
  });
});

describe('bestHand7', () => {
  it('returns the best rank from 7 cards', () => {
    const cards = [
      card(14, 'h'),
      card(13, 'h'),
      card(12, 'h'),
      card(11, 'h'),
      card(10, 'h'),
      card(3, 'd'),
      card(2, 's'),
    ];
    expect(bestHand7(cards)).toBe(10);
  });

  it('finds pair in otherwise weak hand', () => {
    const cards = [
      card(14, 'h'),
      card(13, 'd'),
      card(12, 'c'),
      card(4, 's'),
      card(3, 'h'),
      card(3, 'd'),
      card(2, 's'),
    ];
    expect(bestHand7(cards)).toBe(2);
  });
});

describe('runSimulation', () => {
  it('returns hero/tie counts', () => {
    const hand = [card(14, 'h'), card(14, 'd')];
    const board = [card(14, 'c'), card(10, 's'), card(7, 'h')];
    const result = runSimulation(hand, board, 2, 100);
    expect(result.hero).toBeGreaterThanOrEqual(0);
    expect(result.tie).toBeGreaterThanOrEqual(0);
    expect(result.hero + result.tie).toBeLessThanOrEqual(100);
  });
});
