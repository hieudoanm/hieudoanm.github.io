import { act, renderHook } from '@testing-library/react';
import { usePiGame } from '../usePiGame';
import { HIGH_SCORE_KEY } from '../constants';

jest.useFakeTimers();

const onClose = jest.fn();

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('returns initial state with practice mode', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  expect(result.current.mode).toBe('practice');
  expect(result.current.index).toBe(0);
  expect(result.current.locked).toBe(false);
  expect(result.current.lastResult).toBeNull();
  expect(result.current.revealedIndex).toBeNull();
  expect(result.current.highScore).toBe(0);
  expect(result.current.digits.length).toBeGreaterThan(0);
});

it('loads high score from localStorage', () => {
  localStorage.setItem(HIGH_SCORE_KEY, '42');
  const { result } = renderHook(() => usePiGame(onClose));
  expect(result.current.highScore).toBe(42);
});

it('handleKey with Escape calls onClose', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.handleKey('Escape');
  });
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('in practice mode ArrowRight advances index', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.handleKey('ArrowRight');
  });
  expect(result.current.index).toBe(1);
});

it('in practice mode ArrowLeft goes back', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.handleKey('ArrowRight');
    result.current.handleKey('ArrowRight');
    result.current.handleKey('ArrowLeft');
  });
  expect(result.current.index).toBe(1);
});

it('in practice mode ArrowLeft stays at 0', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.handleKey('ArrowLeft');
  });
  expect(result.current.index).toBe(0);
});

it('switchToGame switches mode and resets', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.handleKey('ArrowRight');
    result.current.handleKey('ArrowRight');
  });
  expect(result.current.index).toBe(2);

  act(() => {
    result.current.switchToGame();
  });
  expect(result.current.mode).toBe('game');
  expect(result.current.index).toBe(0);
  expect(result.current.locked).toBe(false);
  expect(result.current.lastResult).toBeNull();
  expect(result.current.revealedIndex).toBeNull();
});

it('in game mode correct guess advances index', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.switchToGame();
  });
  const correctDigit = result.current.digits[0];

  act(() => {
    result.current.handleKey(correctDigit);
  });
  expect(result.current.lastResult).toBe('correct');

  act(() => {
    jest.advanceTimersByTime(200);
  });
  expect(result.current.index).toBe(1);
  expect(result.current.lastResult).toBeNull();
  expect(result.current.revealedIndex).toBeNull();
});

it('in game mode wrong guess locks and updates high score', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.switchToGame();
  });
  const wrongDigit = result.current.digits[0] === '3' ? '1' : '3';

  act(() => {
    result.current.handleKey(wrongDigit);
  });
  expect(result.current.locked).toBe(true);
  expect(result.current.lastResult).toBe('wrong');
});

it('retry resets game state', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.switchToGame();
  });
  const wrongDigit = result.current.digits[0] === '3' ? '1' : '3';
  act(() => {
    result.current.handleKey(wrongDigit);
  });
  expect(result.current.locked).toBe(true);

  act(() => {
    result.current.retry();
  });
  expect(result.current.locked).toBe(false);
  expect(result.current.lastResult).toBeNull();
  expect(result.current.revealedIndex).toBeNull();
  expect(result.current.index).toBe(0);
});

it('onKeyDown prevents default for ArrowLeft, ArrowRight, Space', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  const preventDefault = jest.fn();
  act(() => {
    result.current.onKeyDown({
      key: 'ArrowLeft',
      preventDefault,
    } as unknown as React.KeyboardEvent);
  });
  expect(preventDefault).toHaveBeenCalledTimes(1);
});

it('setMode changes mode directly', () => {
  const { result } = renderHook(() => usePiGame(onClose));
  act(() => {
    result.current.setMode('game');
  });
  expect(result.current.mode).toBe('game');
});

it('high score persists to localStorage on wrong answer', () => {
  localStorage.setItem(HIGH_SCORE_KEY, '5');
  const { result } = renderHook(() => usePiGame(onClose));
  expect(result.current.highScore).toBe(5);

  act(() => {
    result.current.switchToGame();
  });

  for (let i = 0; i < 10; i++) {
    const digit = result.current.digits[i];
    act(() => {
      result.current.handleKey(digit);
    });
    act(() => {
      jest.advanceTimersByTime(200);
    });
  }
  expect(result.current.index).toBe(10);

  const wrongDigit = result.current.digits[10] === '3' ? '1' : '3';
  act(() => {
    result.current.handleKey(wrongDigit);
  });
  expect(result.current.locked).toBe(true);
  expect(result.current.highScore).toBeGreaterThanOrEqual(10);
  expect(localStorage.getItem(HIGH_SCORE_KEY)).toBe('10');
});
