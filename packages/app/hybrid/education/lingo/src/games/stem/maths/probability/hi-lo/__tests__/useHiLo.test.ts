import { act, renderHook } from '@testing-library/react';
import type { Card } from '../../_shared/cards';
import { freshShuffledDeck } from '../utils';
import { useHiLo } from '../useHiLo';

jest.mock('../utils', () => {
  const actual = jest.requireActual('../utils');
  return {
    ...actual,
    freshShuffledDeck: jest.fn(() => actual.freshShuffledDeck()),
  };
});

const { freshShuffledDeck: mockedDeck } = jest.requireMock('../utils') as {
  freshShuffledDeck: jest.Mock;
};

const fixedDeck = (ranks: string[]): Card[] =>
  ranks.map((rank) => ({ rank, suit: '♠' })) as Card[];

describe('useHiLo', () => {
  beforeEach(() => {
    mockedDeck.mockReset();
    mockedDeck.mockImplementation(
      () => fixedDeck(['9', 'K', '3', 'A', 'Q']) as never
    );
  });

  it('starts with a placeholder card and full credits', () => {
    const { result } = renderHook(() => useHiLo());
    expect(result.current.current).toEqual({ rank: '2', suit: '♠' });
    expect(result.current.credits).toBe(200);
    expect(result.current.streak).toBe(0);
  });

  it('resolves a correct higher guess and pays two to one', () => {
    const { result } = renderHook(() => useHiLo());
    act(() => result.current.guess('higher'));
    expect(result.current.message?.correct).toBe(true);
    expect(result.current.credits).toBe(210);
    expect(result.current.streak).toBe(1);
    expect(result.current.current.rank).toBe('K');
  });

  it('chains winning streaks', () => {
    const { result } = renderHook(() => useHiLo());
    act(() => result.current.guess('higher')); // 9 → K
    act(() => result.current.guess('lower')); // K → 3
    expect(result.current.streak).toBe(2);
    expect(result.current.credits).toBe(220);
    act(() => result.current.guess('higher')); // 3 → A
    expect(result.current.streak).toBe(3);
    expect(result.current.bestStreak).toBe(3);
    expect(result.current.credits).toBe(230);
  });

  it('loses the stake on ties and wrong calls', () => {
    mockedDeck.mockImplementation(
      () => fixedDeck(['7', '7', '8', '8', '9']) as never
    );
    const { result } = renderHook(() => useHiLo());
    act(() => result.current.guess('higher')); // 7 vs 7 — tie loses
    expect(result.current.message?.correct).toBe(false);
    expect(result.current.credits).toBe(190);
    expect(result.current.streak).toBe(0);
    act(() => result.current.guess('higher')); // 7 vs 8 wins
    expect(result.current.streak).toBe(1);
    expect(result.current.credits).toBe(200);
  });

  it('reshuffles when the deck runs low', () => {
    const { result } = renderHook(() => useHiLo());
    for (let index = 0; index < 6; index += 1) {
      act(
        () => void result.current.guess(index % 2 === 0 ? 'lower' : 'higher')
      );
    }
    expect(mockedDeck.mock.calls.length).toBeGreaterThan(0);
  });
});
