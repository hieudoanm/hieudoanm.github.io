import { act, renderHook } from '@testing-library/react';

import { DIR_KEYS, TICK_BASE } from '../constants';
import { useSnake } from '../useSnake';

const key = (value: string) =>
  ({
    key: value,
    preventDefault: jest.fn(),
  }) as unknown as React.KeyboardEvent;

describe('useSnake', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it('starts paused on a fresh board', () => {
    const { result } = renderHook(() => useSnake());

    expect(result.current.paused).toBe(true);
    expect(result.current.running).toBe(false);
    expect(result.current.score).toBe(0);
    expect(result.current.status).toBe('running');
    expect(result.current.speed).toBe(2);
    expect(result.current.label).toBe('EASY');
  });

  it('runs on the base tick once started', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
    });

    expect(result.current.paused).toBe(false);
    expect(result.current.running).toBe(true);

    act(() => {
      jest.advanceTimersByTime(TICK_BASE);
    });

    expect(result.current.snake[0]).not.toEqual({ r: 6, c: 6 });
  });

  it('does not schedule a tick while paused', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
      result.current.togglePause();
    });

    const before = result.current.snake[0];

    act(() => {
      jest.advanceTimersByTime(TICK_BASE * 3);
    });

    expect(result.current.snake[0]).toEqual(before);
    expect(result.current.paused).toBe(true);
  });

  it('toggles pause back to running', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
    });
    act(() => {
      result.current.togglePause();
    });

    expect(result.current.running).toBe(false);

    act(() => {
      result.current.togglePause();
    });

    expect(result.current.running).toBe(true);
  });

  it('changes speed and label together', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.handleSpeed(5);
    });

    expect(result.current.speed).toBe(5);
    expect(result.current.label).toBe('BRUTAL');
  });

  it('accepts a legal turn', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
    });
    act(() => {
      result.current.handleDir('DOWN');
    });
    act(() => {
      jest.advanceTimersByTime(TICK_BASE);
    });

    expect(result.current.snake[0]).toEqual({ r: 7, c: 6 });
  });

  it('ignores a reversal from the keyboard', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
    });
    act(() => {
      result.current.handleDir('LEFT');
    });
    act(() => {
      jest.advanceTimersByTime(TICK_BASE);
    });

    expect(result.current.snake[0]).toEqual({ r: 6, c: 7 });
  });

  it('maps arrow keys to directions', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
    });

    Object.keys(DIR_KEYS).forEach((k) => {
      act(() => {
        result.current.onKeyDown(key(k));
      });
    });

    expect(result.current.paused).toBe(false);
  });

  it('prevents the page from scrolling on arrow keys', () => {
    const { result } = renderHook(() => useSnake());
    const event = key('ArrowUp');

    act(() => {
      result.current.onKeyDown(event);
    });

    expect(
      (event as unknown as { preventDefault: jest.Mock }).preventDefault
    ).toHaveBeenCalled();
  });

  it('pauses on space and on p', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
    });

    act(() => {
      result.current.onKeyDown(key(' '));
    });

    expect(result.current.paused).toBe(true);

    act(() => {
      result.current.start();
      result.current.onKeyDown(key('p'));
    });

    expect(result.current.paused).toBe(true);
  });

  it('restarts on the R key', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
    });
    act(() => {
      jest.advanceTimersByTime(TICK_BASE * 4);
    });

    expect(result.current.snake.length).toBe(3);

    act(() => {
      result.current.onKeyDown(key('r'));
    });

    expect(result.current.snake).toHaveLength(3);
    expect(result.current.score).toBe(0);
  });

  it('banks the best score when the run ends', () => {
    const { result } = renderHook(() => useSnake());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(TICK_BASE * 200);
    });

    expect(result.current.status).toBe('over');
    expect(result.current.best).toBeGreaterThanOrEqual(result.current.score);
    expect(result.current.running).toBe(false);
  });

  it('exposes the level list for the speed control', () => {
    const { result } = renderHook(() => useSnake());

    expect(result.current.speeds).toEqual([1, 2, 3, 4, 5]);
  });
});
