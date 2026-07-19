import { act, renderHook } from '@testing-library/react';
import { useMemoryMatch } from '../useMemoryMatch';
import * as utils from '../utils';

jest.mock('../utils');

const mockedUtils = jest.mocked(utils);

beforeAll(() => {
  jest.useFakeTimers();
});

beforeEach(() => {
  jest.clearAllMocks();
  mockedUtils.createCards.mockReturnValue([
    { id: 0, emoji: '🐶', flipped: false, matched: false },
    { id: 1, emoji: '🐱', flipped: false, matched: false },
    { id: 2, emoji: '🐶', flipped: false, matched: false },
    { id: 3, emoji: '🐱', flipped: false, matched: false },
  ]);
  mockedUtils.EMOJI_CATEGORIES = ['animals', 'food', 'nature'];
});

afterAll(() => {
  jest.useRealTimers();
});

describe('useMemoryMatch', () => {
  it('starts game on mount', () => {
    const { result } = renderHook(() => useMemoryMatch());
    expect(mockedUtils.createCards).toHaveBeenCalledWith(4, 4, 'animals');
  });

  it('flips card on click', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(0);
    });
    const card = result.current.cards.find((c) => c.id === 0);
    expect(card?.flipped).toBe(true);
  });

  it('increments moves after two cards flipped', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(0);
    });
    act(() => {
      result.current.handleCardClick(1);
    });
    expect(result.current.movesCount).toBe(1);
  });

  it('matches pair when emojis match', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(0);
    });
    act(() => {
      result.current.handleCardClick(2);
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });
    const card0 = result.current.cards.find((c) => c.id === 0);
    const card2 = result.current.cards.find((c) => c.id === 2);
    expect(card0?.matched).toBe(true);
    expect(card2?.matched).toBe(true);
  });

  it('declares win when all pairs matched', () => {
    const pairs = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const allCards = pairs.flatMap((emoji, i) => [
      { id: i * 2, emoji, flipped: false, matched: false },
      { id: i * 2 + 1, emoji, flipped: false, matched: false },
    ]);
    mockedUtils.createCards.mockReturnValue(allCards);

    const { result } = renderHook(() => useMemoryMatch());
    for (let i = 0; i < pairs.length; i++) {
      act(() => {
        result.current.handleCardClick(i * 2);
      });
      act(() => {
        result.current.handleCardClick(i * 2 + 1);
      });
      act(() => {
        jest.advanceTimersByTime(400);
      });
    }
    expect(result.current.won).toBe(true);
  });

  it('flips mismatched cards back', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(0);
    });
    act(() => {
      result.current.handleCardClick(1);
    });

    act(() => {
      jest.advanceTimersByTime(800);
    });
    const card0 = result.current.cards.find((c) => c.id === 0);
    const card1 = result.current.cards.find((c) => c.id === 1);
    expect(card0?.flipped).toBe(false);
    expect(card1?.flipped).toBe(false);
  });

  it('ignores click on already flipped card', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(0);
    });
    const movesBefore = result.current.movesCount;
    act(() => {
      result.current.handleCardClick(0);
    });
    expect(result.current.movesCount).toBe(movesBefore);
  });

  it('ignores click on matched card', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(0);
    });
    act(() => {
      result.current.handleCardClick(2);
    });
    act(() => {
      jest.advanceTimersByTime(400);
    });

    const movesBefore = result.current.movesCount;
    act(() => {
      result.current.handleCardClick(0);
    });
    expect(result.current.movesCount).toBe(movesBefore);
  });

  it('ignores click when locked', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(0);
    });
    act(() => {
      result.current.handleCardClick(1);
    });

    const movesBefore = result.current.movesCount;
    act(() => {
      result.current.handleCardClick(2);
    });
    expect(result.current.movesCount).toBe(movesBefore);
  });

  it('ignores click on invalid id', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(999);
    });
    expect(result.current.movesCount).toBe(0);
  });

  it('does not allow clicks after win', () => {
    const pairs = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
    const allCards = pairs.flatMap((emoji, i) => [
      { id: i * 2, emoji, flipped: false, matched: false },
      { id: i * 2 + 1, emoji, flipped: false, matched: false },
    ]);
    mockedUtils.createCards.mockReturnValue(allCards);

    const { result } = renderHook(() => useMemoryMatch());
    for (let i = 0; i < pairs.length; i++) {
      act(() => {
        result.current.handleCardClick(i * 2);
      });
      act(() => {
        result.current.handleCardClick(i * 2 + 1);
      });
      act(() => {
        jest.advanceTimersByTime(400);
      });
    }
    expect(result.current.won).toBe(true);

    const movesBefore = result.current.movesCount;
    act(() => {
      result.current.handleCardClick(0);
    });
    expect(result.current.movesCount).toBe(movesBefore);
  });

  it('handleRowChange resets game with new rows', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleRowChange(2);
    });
    expect(result.current.rows).toBe(2);
    expect(mockedUtils.createCards).toHaveBeenCalledWith(2, 4, 'animals');
  });

  it('handleRowChange accepts 3 rows (6 pairs is valid)', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleRowChange(3);
    });
    expect(result.current.rows).toBe(3);
    expect(mockedUtils.createCards).toHaveBeenCalledWith(3, 4, 'animals');
  });

  it('handleColChange resets game with new cols', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleColChange(6);
    });
    expect(result.current.cols).toBe(6);
    expect(mockedUtils.createCards).toHaveBeenCalledWith(4, 6, 'animals');
  });

  it('handleColChange ignores odd cols', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleColChange(3);
    });
    expect(result.current.cols).toBe(4);
  });

  it('handleCategoryChange resets game with new category', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCategoryChange('food');
    });
    expect(result.current.category).toBe('food');
    expect(mockedUtils.createCards).toHaveBeenCalledWith(4, 4, 'food');
  });

  it('newGame resets the current game', () => {
    const { result } = renderHook(() => useMemoryMatch());
    act(() => {
      result.current.handleCardClick(0);
    });
    act(() => {
      result.current.handleCardClick(1);
    });
    expect(result.current.movesCount).toBe(1);

    act(() => {
      result.current.newGame();
    });
    expect(result.current.movesCount).toBe(0);
    expect(result.current.matchedPairs).toBe(0);
    expect(result.current.won).toBe(false);
  });

  it('timer increments every second', () => {
    const { result } = renderHook(() => useMemoryMatch());
    expect(result.current.timer).toBe(0);
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(result.current.timer).toBe(3);
  });

  it('cleans up timer on unmount', () => {
    const { unmount } = renderHook(() => useMemoryMatch());
    unmount();
    act(() => {
      jest.advanceTimersByTime(5000);
    });
  });
});
