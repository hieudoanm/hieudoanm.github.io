import { act, renderHook } from '@testing-library/react';

import { MATCH_FLIP_DELAY, MISS_FLIP_DELAY, TICK_INTERVAL } from '../constants';
import { useMemoryMatch } from '../useMemoryMatch';
import { Card, createCards } from '../utils';

jest.mock('../utils', () => ({
  ...jest.requireActual<typeof import('../utils')>('../utils'),
  createCards: jest.fn(),
}));

const mockedCreateCards = jest.mocked(createCards);

const buildCards = (pairs: number): Card[] =>
  Array.from({ length: pairs * 2 }, (_, index) => ({
    id: index,
    emoji: `e${Math.floor(index / 2)}`,
    flipped: false,
    matched: false,
  }));

const TWO_PAIRS = buildCards(2);
const EIGHT_PAIRS = buildCards(8);

const clickIn = (
  result: { current: ReturnType<typeof useMemoryMatch> },
  id: number
) =>
  act(() => {
    result.current.handleCardClick(id);
  });

const clearBoard = (result: { current: ReturnType<typeof useMemoryMatch> }) => {
  for (let index = 0; index < EIGHT_PAIRS.length; index += 2) {
    clickIn(result, index);
    clickIn(result, index + 1);
    act(() => {
      jest.advanceTimersByTime(MATCH_FLIP_DELAY);
    });
  }
};

beforeEach(() => {
  jest.useFakeTimers();
  mockedCreateCards.mockReset();
  mockedCreateCards.mockReturnValue(TWO_PAIRS);
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useMemoryMatch setup', () => {
  it('deals a default 4x4 animals grid on mount', () => {
    renderHook(() => useMemoryMatch());

    expect(mockedCreateCards).toHaveBeenCalledWith(4, 4, 'animals');
  });

  it('starts with an empty scoreboard', () => {
    const { result } = renderHook(() => useMemoryMatch());

    expect(result.current.movesCount).toBe(0);
    expect(result.current.matchedPairs).toBe(0);
    expect(result.current.totalPairs).toBe(8);
    expect(result.current.won).toBe(false);
  });

  it('advances the clock every second while mounted', () => {
    const { result } = renderHook(() => useMemoryMatch());

    act(() => {
      jest.advanceTimersByTime(TICK_INTERVAL * 3);
    });

    expect(result.current.timer).toBe(3);
  });

  it('stops the clock on unmount', () => {
    const { unmount } = renderHook(() => useMemoryMatch());

    unmount();

    expect(() => jest.advanceTimersByTime(TICK_INTERVAL * 5)).not.toThrow();
  });
});

describe('useMemoryMatch card clicks', () => {
  it('flips a face-down card', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 0);

    expect(result.current.cards.find((card) => card.id === 0)?.flipped).toBe(
      true
    );
  });

  it('counts a move once two cards are flipped', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 0);
    clickIn(result, 1);

    expect(result.current.movesCount).toBe(1);
  });

  it('marks a matching pair after the flip delay', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 0);
    clickIn(result, 1);
    act(() => {
      jest.advanceTimersByTime(MATCH_FLIP_DELAY);
    });

    const pair = result.current.cards.filter((card) =>
      [0, 1].includes(card.id)
    );

    expect(pair.every((card) => card.matched)).toBe(true);
    expect(result.current.matchedPairs).toBe(1);
  });

  it('turns a mismatched pair face down after the miss delay', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 0);
    clickIn(result, 2);
    act(() => {
      jest.advanceTimersByTime(MISS_FLIP_DELAY);
    });

    expect(result.current.cards.some((card) => card.flipped)).toBe(false);
    expect(result.current.matchedPairs).toBe(0);
  });

  it('declares a win and stops the clock on the last pair', () => {
    mockedCreateCards.mockReturnValue(EIGHT_PAIRS);

    const { result } = renderHook(() => useMemoryMatch());

    clearBoard(result);

    expect(result.current.won).toBe(true);
    expect(result.current.matchedPairs).toBe(8);

    const timer = result.current.timer;

    act(() => {
      jest.advanceTimersByTime(TICK_INTERVAL * 3);
    });

    expect(result.current.timer).toBe(timer);
  });

  it('ignores a click on an unknown card id', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 999);

    expect(result.current.movesCount).toBe(0);
  });

  it('ignores a click on a card that is already face up', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 0);
    clickIn(result, 0);

    expect(result.current.movesCount).toBe(0);
  });

  it('ignores a click on a matched card', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 0);
    clickIn(result, 1);
    act(() => {
      jest.advanceTimersByTime(MATCH_FLIP_DELAY);
    });
    clickIn(result, 0);

    expect(result.current.movesCount).toBe(1);
  });

  it('ignores clicks while a pair is still resolving', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 0);
    clickIn(result, 1);
    clickIn(result, 2);

    expect(result.current.movesCount).toBe(1);
  });

  it('ignores clicks after the game is won', () => {
    mockedCreateCards.mockReturnValue(EIGHT_PAIRS);

    const { result } = renderHook(() => useMemoryMatch());

    clearBoard(result);

    const moves = result.current.movesCount;

    clickIn(result, 0);

    expect(result.current.movesCount).toBe(moves);
  });
});

describe('useMemoryMatch settings', () => {
  it('redeals when the row count changes', () => {
    const { result } = renderHook(() => useMemoryMatch());

    act(() => {
      result.current.handleRowChange(2);
    });

    expect(result.current.rows).toBe(2);
    expect(result.current.totalPairs).toBe(4);
    expect(mockedCreateCards).toHaveBeenLastCalledWith(2, 4, 'animals');
  });

  it('accepts an odd row count while the pair count stays whole', () => {
    const { result } = renderHook(() => useMemoryMatch());

    act(() => {
      result.current.handleRowChange(3);
    });

    expect(result.current.rows).toBe(3);
    expect(result.current.totalPairs).toBe(6);
  });

  it('redeals when the column count changes', () => {
    const { result } = renderHook(() => useMemoryMatch());

    act(() => {
      result.current.handleColChange(6);
    });

    expect(result.current.cols).toBe(6);
    expect(result.current.totalPairs).toBe(12);
    expect(mockedCreateCards).toHaveBeenLastCalledWith(4, 6, 'animals');
  });

  it('redeals when the category changes', () => {
    const { result } = renderHook(() => useMemoryMatch());

    act(() => {
      result.current.handleCategoryChange('food');
    });

    expect(result.current.category).toBe('food');
    expect(mockedCreateCards).toHaveBeenLastCalledWith(4, 4, 'food');
  });

  it('resets the scoreboard on a new game', () => {
    const { result } = renderHook(() => useMemoryMatch());

    clickIn(result, 0);
    clickIn(result, 2);
    act(() => {
      jest.advanceTimersByTime(MISS_FLIP_DELAY);
    });
    act(() => {
      result.current.newGame();
    });

    expect(result.current.movesCount).toBe(0);
    expect(result.current.matchedPairs).toBe(0);
    expect(result.current.won).toBe(false);
    expect(result.current.cards.every((card) => !card.flipped)).toBe(true);
  });
});
