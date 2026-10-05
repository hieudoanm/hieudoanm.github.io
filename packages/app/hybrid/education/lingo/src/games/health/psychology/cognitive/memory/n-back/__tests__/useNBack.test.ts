import { act, renderHook } from '@testing-library/react';

import {
  DEFAULT_N,
  INTERVAL_DURATION,
  STIMULUS_DURATION,
  TOTAL_STIMULI,
} from '../constants';
import { useNBack } from '../useNBack';

type Hook = ReturnType<typeof useNBack>;

const respondToAll = (result: { current: Hook }) => {
  for (let index = 0; index < TOTAL_STIMULI; index++) {
    act(() => {
      result.current.respond('no-match');
    });
  }
};

const reachTrial = (
  result: { current: Hook },
  predicate: (index: number) => boolean
) => {
  while (!predicate(result.current.currentIdx)) {
    act(() => {
      result.current.respond('no-match');
    });
  }
};

const firstTarget = (trials: Hook['trials']): number =>
  trials.findIndex((trial) => trial.isTarget);

const firstNonTarget = (trials: Hook['trials']): number =>
  trials.findIndex((trial) => !trial.isTarget);

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useNBack lifecycle', () => {
  it('waits for the player before the first trial', () => {
    const { result } = renderHook(() => useNBack());

    expect(result.current.phase).toBe('ready');
    expect(result.current.n).toBe(DEFAULT_N);
    expect(result.current.trials).toEqual([]);
  });

  it('deals a full trial list on start', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });

    expect(result.current.phase).toBe('running');
    expect(result.current.trials).toHaveLength(TOTAL_STIMULI);
    expect(result.current.currentIdx).toBe(0);
  });

  it('regenerates trials at the newly chosen n', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.setN(3);
    });
    act(() => {
      result.current.start();
    });

    expect(result.current.n).toBe(3);
    expect(result.current.trials.slice(0, 3).every((t) => !t.isTarget)).toBe(
      true
    );
  });

  it('counts a hit when a target is confirmed', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });

    reachTrial(result, (index) => index === firstTarget(result.current.trials));

    act(() => {
      result.current.respond('match');
    });

    expect(result.current.hits).toBe(1);
    expect(result.current.misses).toBe(0);
  });

  it('counts a false alarm when a non-target is confirmed', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });

    reachTrial(
      result,
      (index) => index === firstNonTarget(result.current.trials)
    );

    act(() => {
      result.current.respond('match');
    });

    expect(result.current.falseAlarms).toBe(1);
  });

  it('counts a miss when a target is rejected', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });

    reachTrial(result, (index) => index === firstTarget(result.current.trials));

    act(() => {
      result.current.respond('no-match');
    });

    expect(result.current.misses).toBe(1);
  });

  it('advances on its own when a trial is left unanswered', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });
    act(() => {
      jest.advanceTimersByTime(STIMULUS_DURATION);
    });

    expect(result.current.currentIdx).toBe(1);
  });

  it('ends the run after the final trial', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });

    respondToAll(result);

    expect(result.current.phase).toBe('result');
  });

  it('restarts from a clean scoreboard', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });

    respondToAll(result);

    act(() => {
      result.current.start();
    });

    expect(result.current.phase).toBe('running');
    expect(result.current.hits).toBe(0);
    expect(result.current.currentIdx).toBe(0);
  });

  it('reports accuracy as hits over hits plus false alarms', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });

    reachTrial(result, (index) => index === firstTarget(result.current.trials));

    act(() => {
      result.current.respond('match');
    });

    expect(result.current.accuracy).toBe(1);
  });

  it('ignores responses before the run starts', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.respond('match');
    });

    expect(result.current.phase).toBe('ready');
    expect(result.current.hits).toBe(0);
  });

  it('maps the L key to a no-match response', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });
    act(() => {
      result.current.onKeyDown({ key: 'l' } as React.KeyboardEvent);
    });

    expect(result.current.currentIdx).toBe(1);
  });

  it('maps the A key to a match response', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });
    act(() => {
      result.current.onKeyDown({ key: 'a' } as React.KeyboardEvent);
    });

    expect(result.current.currentIdx).toBe(1);
  });

  it('starts the run on Enter from the ready screen', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.onKeyDown({ key: 'Enter' } as React.KeyboardEvent);
    });

    expect(result.current.phase).toBe('running');
    expect(result.current.trials).toHaveLength(TOTAL_STIMULI);
  });

  it('does not restart a finished run on Enter', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });
    respondToAll(result);
    act(() => {
      result.current.onKeyDown({ key: 'Enter' } as React.KeyboardEvent);
    });

    expect(result.current.phase).toBe('result');
  });

  it('ignores keys that are not bound', () => {
    const { result } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });
    act(() => {
      result.current.onKeyDown({ key: 'z' } as React.KeyboardEvent);
    });

    expect(result.current.currentIdx).toBe(0);
  });

  it('clears its pending timer on unmount', () => {
    const { result, unmount } = renderHook(() => useNBack());

    act(() => {
      result.current.start();
    });

    unmount();

    expect(() =>
      jest.advanceTimersByTime(TOTAL_STIMULI * (INTERVAL_DURATION * 4))
    ).not.toThrow();
  });
});
