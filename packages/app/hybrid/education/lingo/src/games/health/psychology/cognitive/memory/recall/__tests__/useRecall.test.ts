import { act, renderHook } from '@testing-library/react';

import { MAX_TIME, MIN_TIME } from '../constants';
import { useHighStreak } from '../useHighStreak';
import { useRecall } from '../useRecall';

type RecallHook = ReturnType<typeof useRecall>;

const wrongFor = (number: string): string => (number === '9' ? '8' : '9');

const submitAnswer = (result: { current: RecallHook }, answer: string) => {
  act(() => {
    result.current.setInput(answer);
  });
  act(() => {
    result.current.submit();
  });
};

const playRound = (result: { current: RecallHook }, correct = true) => {
  act(() => {
    result.current.start();
  });
  act(() => {
    jest.advanceTimersByTime(MAX_TIME);
  });
  submitAnswer(
    result,
    correct ? result.current.number : wrongFor(result.current.number)
  );
};

beforeEach(() => {
  localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useRecall round flow', () => {
  it('waits on the ready screen', () => {
    const { result } = renderHook(() => useRecall());

    expect(result.current.phase).toBe('ready');
    expect(result.current.level).toBe(1);
  });

  it('shows one digit per level with a countdown', () => {
    const { result } = renderHook(() => useRecall());

    act(() => {
      result.current.start();
    });

    expect(result.current.phase).toBe('show');
    expect(result.current.number).toHaveLength(1);
    expect(result.current.countdown).toBe(Math.ceil(MIN_TIME / 1000));
  });

  it('counts the show window down each second', () => {
    const { result } = renderHook(() => useRecall());

    act(() => {
      result.current.start();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.countdown).toBe(1);
  });

  it('moves to the input phase once the window closes', () => {
    const { result } = renderHook(() => useRecall());

    act(() => {
      result.current.start();
    });
    act(() => {
      jest.advanceTimersByTime(MIN_TIME);
    });

    expect(result.current.phase).toBe('input');
    expect(result.current.countdown).toBe(0);
  });

  it('ignores an answer submitted before the input phase', () => {
    const { result } = renderHook(() => useRecall());

    act(() => {
      result.current.start();
    });
    submitAnswer(result, '1');

    expect(result.current.phase).toBe('show');
    expect(result.current.lastRoundFailed).toBe(false);
  });

  it('levels up after a correct answer', () => {
    const { result } = renderHook(() => useRecall());

    playRound(result);

    expect(result.current.phase).toBe('result');
    expect(result.current.lastRoundFailed).toBe(false);
    expect(result.current.level).toBe(2);
  });

  it('records the streak reached on a correct answer', () => {
    const { result } = renderHook(() => useRecall());

    playRound(result);

    expect(result.current.highStreak).toBe(1);
  });

  it('shows one more digit on the next level', () => {
    const { result } = renderHook(() => useRecall());

    playRound(result);
    act(() => {
      result.current.next();
    });

    expect(result.current.number).toHaveLength(2);
  });

  it('restarts at level one after a wrong answer', () => {
    const { result } = renderHook(() => useRecall());

    playRound(result, false);

    expect(result.current.phase).toBe('result');
    expect(result.current.lastRoundFailed).toBe(true);
    expect(result.current.level).toBe(1);
  });

  it('keeps the best streak after a wrong answer', () => {
    const { result } = renderHook(() => useRecall());

    playRound(result);
    playRound(result, false);

    expect(result.current.highStreak).toBe(1);
  });

  it('starts the retry round from level one', () => {
    const { result } = renderHook(() => useRecall());

    playRound(result, false);
    act(() => {
      result.current.next();
    });

    expect(result.current.number).toHaveLength(1);
    expect(result.current.lastRoundFailed).toBe(true);
  });

  it('toggles the digit mask', () => {
    const { result } = renderHook(() => useRecall());

    expect(result.current.mask).toBe(false);

    act(() => {
      result.current.setMask(true);
    });

    expect(result.current.mask).toBe(true);
  });

  it('starts on Enter from the ready screen', () => {
    const { result } = renderHook(() => useRecall());

    act(() => {
      result.current.onKeyDown({ key: 'Enter' } as React.KeyboardEvent);
    });

    expect(result.current.phase).toBe('show');
  });

  it('continues on Enter from the result screen', () => {
    const { result } = renderHook(() => useRecall());

    playRound(result);
    act(() => {
      result.current.onKeyDown({ key: 'Enter' } as React.KeyboardEvent);
    });

    expect(result.current.phase).toBe('show');
  });

  it('ignores other keys', () => {
    const { result } = renderHook(() => useRecall());

    act(() => {
      result.current.onKeyDown({ key: 'x' } as React.KeyboardEvent);
    });

    expect(result.current.phase).toBe('ready');
  });

  it('clears its pending timers on unmount', () => {
    const { result, unmount } = renderHook(() => useRecall());

    act(() => {
      result.current.start();
    });

    unmount();

    expect(() => jest.advanceTimersByTime(MAX_TIME * 3)).not.toThrow();
  });
});

describe('useHighStreak', () => {
  it('starts at zero without stored data', () => {
    const { result } = renderHook(() => useHighStreak());

    expect(result.current.highStreak).toBe(0);
  });

  it('restores a stored streak', () => {
    localStorage.setItem('recall-high-streak', '4');

    const { result } = renderHook(() => useHighStreak());

    expect(result.current.highStreak).toBe(4);
  });

  it('raises the streak and persists it', () => {
    const { result } = renderHook(() => useHighStreak());

    act(() => {
      result.current.updateHighStreak(3);
    });

    expect(result.current.highStreak).toBe(3);
    expect(localStorage.getItem('recall-high-streak')).toBe('3');
  });

  it('never lowers the streak', () => {
    localStorage.setItem('recall-high-streak', '5');

    const { result } = renderHook(() => useHighStreak());

    act(() => {
      result.current.updateHighStreak(2);
    });

    expect(result.current.highStreak).toBe(5);
  });

  it('falls back to zero for a corrupt value', () => {
    localStorage.setItem('recall-high-streak', 'oops');

    const { result } = renderHook(() => useHighStreak());

    expect(result.current.highStreak).toBe(0);
  });
});
