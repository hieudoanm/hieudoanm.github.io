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
});
