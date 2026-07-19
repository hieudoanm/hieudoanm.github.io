import { act, renderHook } from '@testing-library/react';

import { ADVANCE_DELAY, HIGH_SCORE_KEY } from '../constants';
import { usePiGame } from '../usePiGame';

beforeEach(() => {
  localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('usePiGame practice mode', () => {
  it('starts in practice mode at the first digit', () => {
    const { result } = renderHook(() => usePiGame());

    expect(result.current.mode).toBe('practice');
    expect(result.current.index).toBe(0);
    expect(result.current.locked).toBe(false);
  });

  it('exposes the digit sequence with the leading 3 and point', () => {
    const { result } = renderHook(() => usePiGame());

    expect(result.current.digits.slice(0, 6).join('')).toBe('3.1415');
  });

  it('steps forward with the right arrow', () => {
    const { result } = renderHook(() => usePiGame());

    act(() => {
      result.current.handleKey('ArrowRight');
    });

    expect(result.current.index).toBe(1);
  });

  it('ignores digits typed while practicing', () => {
    const { result } = renderHook(() => usePiGame());

    act(() => {
      result.current.handleKey('5');
    });

    expect(result.current.index).toBe(0);
    expect(result.current.locked).toBe(false);
  });

  it('never locks the practice strip', () => {
    const { result } = renderHook(() => usePiGame());

    act(() => {
      result.current.handleKey('9');
    });
    act(() => {
      result.current.handleKey('9');
    });

    expect(result.current.locked).toBe(false);
  });
});

describe('usePiGame game mode', () => {
  const startGame = (result: { current: ReturnType<typeof usePiGame> }) => {
    act(() => {
      result.current.switchToGame();
    });
  };

  it('starts at the beginning', () => {
    const { result } = renderHook(() => usePiGame());

    startGame(result);

    expect(result.current.mode).toBe('game');
    expect(result.current.index).toBe(0);
  });

  it('advances one digit after a correct key', () => {
    const { result } = renderHook(() => usePiGame());

    startGame(result);

    act(() => {
      result.current.handleKey('3');
    });

    expect(result.current.lastResult).toBe('correct');

    act(() => {
      jest.advanceTimersByTime(ADVANCE_DELAY);
    });

    expect(result.current.index).toBe(1);
  });

  it('accepts the decimal point as the second digit', () => {
    const { result } = renderHook(() => usePiGame());

    startGame(result);
    act(() => {
      result.current.handleKey('3');
    });
    act(() => {
      jest.advanceTimersByTime(ADVANCE_DELAY);
    });
    act(() => {
      result.current.handleKey('.');
    });

    expect(result.current.lastResult).toBe('correct');

    act(() => {
      jest.advanceTimersByTime(ADVANCE_DELAY);
    });

    expect(result.current.index).toBe(2);
  });

  it('locks on a wrong digit and reveals it', () => {
    const { result } = renderHook(() => usePiGame());

    startGame(result);
    act(() => {
      result.current.handleKey('7');
    });

    expect(result.current.locked).toBe(true);
    expect(result.current.lastResult).toBe('wrong');
    expect(result.current.revealedIndex).toBe(0);
  });

  it('stays at the same index after a mistake', () => {
    const { result } = renderHook(() => usePiGame());

    startGame(result);
    act(() => {
      result.current.handleKey('7');
    });
    act(() => {
      jest.advanceTimersByTime(ADVANCE_DELAY * 3);
    });

    expect(result.current.index).toBe(0);
  });

  it('resets the run on retry but keeps the best score', () => {
    const { result } = renderHook(() => usePiGame());

    startGame(result);
    act(() => {
      result.current.handleKey('3');
    });
    act(() => {
      jest.advanceTimersByTime(ADVANCE_DELAY);
    });
    act(() => {
      result.current.handleKey('9');
    });

    expect(result.current.locked).toBe(true);

    act(() => {
      result.current.retry();
    });

    expect(result.current.index).toBe(0);
    expect(result.current.locked).toBe(false);
    expect(result.current.highScore).toBe(1);
  });

  it('persists a new best score to storage on the first mistake', () => {
    const { result } = renderHook(() => usePiGame());

    startGame(result);
    act(() => {
      result.current.handleKey('3');
    });
    act(() => {
      jest.advanceTimersByTime(ADVANCE_DELAY);
    });
    act(() => {
      result.current.handleKey('9');
    });

    expect(localStorage.getItem(HIGH_SCORE_KEY)).toBe('1');
  });

  it('restores the stored best score on mount', () => {
    localStorage.setItem(HIGH_SCORE_KEY, '9');

    const { result } = renderHook(() => usePiGame());

    expect(result.current.highScore).toBe(9);
  });

  it('keeps the best score when a shorter run ends early', () => {
    localStorage.setItem(HIGH_SCORE_KEY, '9');

    const { result } = renderHook(() => usePiGame());

    startGame(result);
    act(() => {
      result.current.handleKey('7');
    });

    expect(result.current.highScore).toBe(9);
  });
});
