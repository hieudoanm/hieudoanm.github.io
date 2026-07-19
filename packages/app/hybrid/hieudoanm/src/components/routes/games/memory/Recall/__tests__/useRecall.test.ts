import { act, renderHook } from '@testing-library/react';
import { useRecall } from '../useRecall';

jest.useFakeTimers();

const onClose = jest.fn();

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.clearAllMocks();
});

it('returns initial state', () => {
  const { result } = renderHook(() => useRecall(onClose));
  expect(result.current.phase).toBe('ready');
  expect(result.current.level).toBe(1);
  expect(result.current.number).toBe('');
  expect(result.current.input).toBe('');
  expect(result.current.message).toBe('');
  expect(result.current.countdown).toBe(0);
  expect(result.current.mask).toBe(false);
  expect(result.current.highStreak).toBe(0);
  expect(result.current.lastRoundFailed).toBe(false);
});

it('start begins the game at level 1', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  act(() => {
    result.current.start();
  });
  expect(result.current.phase).toBe('show');
  expect(result.current.level).toBe(1);
  expect(result.current.number).not.toBe('');
  expect(result.current.countdown).toBeGreaterThan(0);
});

it('countdown decrements each second', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  act(() => {
    result.current.start();
  });
  const initialCountdown = result.current.countdown;

  await act(async () => {
    jest.advanceTimersByTime(1000);
  });
  expect(result.current.countdown).toBe(Math.max(0, initialCountdown - 1));
});

it('transitions to input phase after show duration', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  act(() => {
    result.current.start();
  });
  expect(result.current.phase).toBe('show');

  await act(async () => {
    jest.advanceTimersByTime(100000);
  });
  expect(result.current.phase).toBe('input');
  expect(result.current.countdown).toBe(0);
});

it('submit with correct answer levels up', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  await act(async () => {
    result.current.start();
  });
  await act(async () => {
    jest.advanceTimersByTime(100000);
  });

  act(() => {
    result.current.setInput(result.current.number);
  });
  await act(async () => {
    result.current.submit();
  });
  expect(result.current.phase).toBe('result');
  expect(result.current.message).toContain('Correct');
  expect(result.current.level).toBe(2);
  expect(result.current.lastRoundFailed).toBe(false);
});

it('submit with wrong answer shows mistakes and resets level', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  await act(async () => {
    result.current.start();
  });
  await act(async () => {
    jest.advanceTimersByTime(100000);
  });

  act(() => {
    result.current.setInput('000');
  });
  await act(async () => {
    result.current.submit();
  });
  expect(result.current.phase).toBe('result');
  expect(result.current.message).toContain('Wrong');
  expect(result.current.level).toBe(1);
  expect(result.current.lastRoundFailed).toBe(true);
});

it('next starts next round with current level', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  await act(async () => {
    result.current.start();
  });
  await act(async () => {
    jest.advanceTimersByTime(100000);
  });
  act(() => {
    result.current.setInput(result.current.number);
  });
  await act(async () => {
    result.current.submit();
  });
  expect(result.current.level).toBe(2);

  await act(async () => {
    result.current.next();
  });
  expect(result.current.phase).toBe('show');
  expect(result.current.message).toBe('');
});

it('onKeyDown with Escape calls onClose', () => {
  const { result } = renderHook(() => useRecall(onClose));
  act(() => {
    result.current.onKeyDown({ key: 'Escape' } as React.KeyboardEvent);
  });
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('onKeyDown with Enter in ready phase starts game', () => {
  const { result } = renderHook(() => useRecall(onClose));
  act(() => {
    result.current.onKeyDown({ key: 'Enter' } as React.KeyboardEvent);
  });
  expect(result.current.phase).toBe('show');
});

it('onKeyDown with Enter in result phase goes next', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  await act(async () => {
    result.current.start();
  });
  await act(async () => {
    jest.advanceTimersByTime(100000);
  });
  act(() => {
    result.current.setInput(result.current.number);
  });
  await act(async () => {
    result.current.submit();
  });

  await act(async () => {
    result.current.onKeyDown({ key: 'Enter' } as React.KeyboardEvent);
  });
  expect(result.current.phase).toBe('show');
});

it('onKeyDown with non-Enter non-Escape does nothing', () => {
  const { result } = renderHook(() => useRecall(onClose));
  act(() => {
    result.current.onKeyDown({ key: 'a' } as React.KeyboardEvent);
  });
  expect(result.current.phase).toBe('ready');
  expect(onClose).not.toHaveBeenCalled();
});

it('updates high streak on correct answer', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  await act(async () => {
    result.current.start();
  });
  await act(async () => {
    jest.advanceTimersByTime(100000);
  });
  act(() => {
    result.current.setInput(result.current.number);
  });
  await act(async () => {
    result.current.submit();
  });
  expect(result.current.highStreak).toBeGreaterThanOrEqual(1);
});

it('persists high streak to localStorage', async () => {
  const { result } = renderHook(() => useRecall(onClose));
  await act(async () => {
    result.current.start();
  });
  await act(async () => {
    jest.advanceTimersByTime(100000);
  });
  act(() => {
    result.current.setInput(result.current.number);
  });
  await act(async () => {
    result.current.submit();
  });
  expect(localStorage.getItem('highStreak')).not.toBeNull();
});

it('clears timers on unmount', () => {
  const { result, unmount } = renderHook(() => useRecall(onClose));
  act(() => {
    result.current.start();
  });
  unmount();

  act(() => {
    jest.advanceTimersByTime(100000);
  });
  expect(result.current.countdown).toBeGreaterThan(0);
});

it('mask toggle works', () => {
  const { result } = renderHook(() => useRecall(onClose));
  expect(result.current.mask).toBe(false);
  act(() => {
    result.current.setMask(true);
  });
  expect(result.current.mask).toBe(true);
});

it('startRound respects MIN_TIME and MAX_TIME', () => {
  const { result } = renderHook(() => useRecall(onClose));
  act(() => {
    result.current.start();
  });
  expect(result.current.countdown).toBeGreaterThanOrEqual(1);
  expect(result.current.countdown).toBeLessThanOrEqual(6);
});
