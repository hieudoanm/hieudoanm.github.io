import { act, renderHook } from '@testing-library/react';
import { useGame } from '../useGame';

jest.useFakeTimers();

const playTone = jest.fn();

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});

it('returns initial state', () => {
  const { result } = renderHook(() => useGame(playTone));
  expect(result.current.started).toBe(false);
  expect(result.current.target).toBeNull();
  expect(result.current.score).toBe(0);
  expect(result.current.highScore).toBe(0);
  expect(result.current.feedback).toBeNull();
  expect(result.current.level).toBe(1);
});

it('loads high score from localStorage on mount', () => {
  localStorage.setItem('pitch-high-score', '15');
  const { result } = renderHook(() => useGame(playTone));
  expect(result.current.highScore).toBe(15);
});

it('handles invalid high score in localStorage', () => {
  localStorage.setItem('pitch-high-score', 'not-a-number');
  const { result } = renderHook(() => useGame(playTone));
  expect(Number.isNaN(result.current.highScore)).toBe(true);
});

it('startGame resets score and starts first round', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.startGame();
  });
  expect(result.current.started).toBe(true);
  expect(result.current.score).toBe(0);
  expect(result.current.target).not.toBeNull();
  expect(playTone).toHaveBeenCalled();
});

it('handleGuess returns early if game not started', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.handleGuess('c');
  });
  expect(result.current.feedback).toBeNull();
});

it('handleGuess returns early if target is null', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.startGame();
  });
  const { result: r2 } = renderHook(() => useGame(playTone));
  act(() => {
    r2.current.handleGuess('c');
  });
});

it('handleGuess correct gives feedback and advances', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.startGame();
  });
  const target = result.current.target!;

  act(() => {
    result.current.handleGuess(target);
  });
  expect(result.current.feedback).toEqual({ correctId: target });
  expect(result.current.score).toBe(1);

  act(() => {
    jest.advanceTimersByTime(700);
  });
  expect(result.current.feedback).toBeNull();
});

it('handleGuess wrong gives feedback and resets after delay', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.startGame();
  });
  const wrongId = result.current.target === 'c' ? 'd' : 'c';

  act(() => {
    result.current.handleGuess(wrongId);
  });
  expect(result.current.feedback).toEqual({
    correctId: result.current.target,
    wrongId,
  });

  act(() => {
    jest.advanceTimersByTime(900);
  });
  expect(result.current.feedback).toBeNull();
  expect(result.current.started).toBe(false);
  expect(result.current.score).toBe(0);
  expect(result.current.target).toBeNull();
});

it('updates high score on wrong answer when score beats previous', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.startGame();
  });

  for (let i = 0; i < 3; i++) {
    const target = result.current.target!;
    act(() => {
      result.current.handleGuess(target);
    });
    act(() => {
      jest.advanceTimersByTime(700);
    });
  }
  expect(result.current.score).toBe(3);

  const wrongId = result.current.target === 'c' ? 'd' : 'c';
  act(() => {
    result.current.handleGuess(wrongId);
  });
  act(() => {
    jest.advanceTimersByTime(900);
  });
  expect(localStorage.getItem('pitch-high-score')).toBe('3');
  expect(result.current.highScore).toBe(3);
});

it('levels up every 10 correct answers', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.startGame();
  });

  for (let round = 0; round < 2; round++) {
    for (let i = 0; i < 10; i++) {
      const target = result.current.target!;
      act(() => {
        result.current.handleGuess(target);
      });
      act(() => {
        jest.advanceTimersByTime(700);
      });
    }
  }
  expect(result.current.level).toBeGreaterThanOrEqual(2);
  expect(result.current.score).toBe(20);
});

it('stays at max level', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.startGame();
  });

  for (let round = 0; round < 20; round++) {
    for (let i = 0; i < 10; i++) {
      const target = result.current.target!;
      act(() => {
        result.current.handleGuess(target);
      });
      act(() => {
        jest.advanceTimersByTime(700);
      });
    }
  }
  expect(result.current.level).toBeLessThanOrEqual(11);
});

it('handleGuess wrong with score=0 does not persist high score', () => {
  const { result } = renderHook(() => useGame(playTone));
  act(() => {
    result.current.startGame();
  });
  const wrongId = result.current.target === 'c' ? 'd' : 'c';

  act(() => {
    result.current.handleGuess(wrongId);
  });
  act(() => {
    jest.advanceTimersByTime(900);
  });
  expect(localStorage.getItem('pitch-high-score')).toBeNull();
});
