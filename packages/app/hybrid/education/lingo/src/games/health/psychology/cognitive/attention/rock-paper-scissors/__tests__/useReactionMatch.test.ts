import { act, renderHook } from '@testing-library/react';

import { FEEDBACK_MS, LAPSE_MS } from '../constants';
import { useReactionMatch } from '../useReactionMatch';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  randomChoice: jest.fn(() => 'rock'),
}));

let clock = 0;

const now = () => clock;

const key = (value: string) =>
  ({
    key: value,
    preventDefault: jest.fn(),
  }) as unknown as React.KeyboardEvent;

describe('useReactionMatch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    clock = 0;
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  const mount = () => renderHook(() => useReactionMatch({ now }));

  it('waits for the player to start', () => {
    const { result } = mount();

    expect(result.current.phase).toBe('idle');
    expect(result.current.bot).toBeNull();
    expect(result.current.trials).toHaveLength(0);
    expect(result.current.summary.trials).toBe(0);
    expect(result.current.totalTrials).toBe(20);
  });

  it('reveals the bot move first and waits for the counter', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    expect(result.current.phase).toBe('awaiting');
    expect(result.current.bot).toBe('rock');
  });

  it('records the reaction time of a correct counter', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    clock = 620;

    act(() => {
      result.current.respond('paper');
    });

    expect(result.current.phase).toBe('feedback');
    expect(result.current.last).toMatchObject({
      bot: 'rock',
      human: 'paper',
      reactionMs: 620,
      correct: true,
    });
    expect(result.current.summary.accuracy).toBe(1);
  });

  it('records the reaction time of a wrong counter', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    clock = 400;

    act(() => {
      result.current.respond('rock');
    });

    expect(result.current.last?.correct).toBe(false);
    expect(result.current.summary.accuracy).toBe(0);
  });

  it('ignores a response before the reveal', () => {
    const { result } = mount();

    act(() => {
      result.current.respond('paper');
    });

    expect(result.current.phase).toBe('idle');
    expect(result.current.trials).toHaveLength(0);
  });

  it('ignores a second response within the same trial', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    clock = 300;

    act(() => {
      result.current.respond('paper');
    });
    act(() => {
      result.current.respond('paper');
    });

    expect(result.current.trials).toHaveLength(1);
  });

  it('shows feedback for a beat before the next reveal', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    clock = 300;

    act(() => {
      result.current.respond('paper');
    });

    act(() => {
      jest.advanceTimersByTime(FEEDBACK_MS - 1);
    });

    expect(result.current.phase).toBe('feedback');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current.phase).toBe('awaiting');
  });

  it('finishes the block after the last trial', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    for (let i = 0; i < result.current.totalTrials; i++) {
      act(() => {
        jest.advanceTimersByTime(i * 100 + 500);
      });
      act(() => {
        result.current.respond('paper');
      });
      act(() => {
        jest.advanceTimersByTime(FEEDBACK_MS);
      });
    }

    expect(result.current.phase).toBe('done');
    expect(result.current.trials).toHaveLength(result.current.totalTrials);
    expect(result.current.summary.trials).toBe(result.current.totalTrials);
  });

  it('honours a smaller block size', () => {
    const { result } = mount();

    act(() => {
      result.current.setTotalTrials(10);
      result.current.start();
    });

    expect(result.current.totalTrials).toBe(10);

    for (let i = 0; i < 10; i++) {
      act(() => {
        jest.advanceTimersByTime(i * 120 + 400);
      });
      act(() => {
        result.current.respond('paper');
      });
      act(() => {
        result.current.advance();
      });
    }

    expect(result.current.phase).toBe('done');
  });

  it('lets the player skip the feedback pause', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    act(() => {
      result.current.respond('paper');
    });
    act(() => {
      result.current.advance();
    });

    expect(result.current.phase).toBe('awaiting');
    expect(result.current.trials).toHaveLength(1);
  });

  it('counts lapses and anticipations in the summary', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    clock = 30;

    act(() => {
      result.current.respond('paper');
    });
    act(() => {
      result.current.advance();
    });
    clock += LAPSE_MS + 400;

    act(() => {
      result.current.respond('rock');
    });

    expect(result.current.summary.anticipatories).toBe(1);
    expect(result.current.summary.lapses).toBe(1);
    expect(result.current.summary.correct).toBe(0);
  });

  it('clears everything on reset', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    clock = 500;

    act(() => {
      result.current.respond('paper');
    });
    act(() => {
      result.current.reset();
    });

    expect(result.current.phase).toBe('idle');
    expect(result.current.bot).toBeNull();
    expect(result.current.last).toBeNull();
    expect(result.current.trials).toHaveLength(0);
    expect(result.current.summary.trials).toBe(0);
  });

  it('answers a hotkey with the matching move', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    clock = 350;

    act(() => {
      result.current.onKeyDown(key('2'));
    });

    expect(result.current.last?.human).toBe('paper');
  });

  it('ignores a hotkey that is not bound', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    act(() => {
      result.current.onKeyDown(key('9'));
    });

    expect(result.current.phase).toBe('awaiting');
    expect(result.current.trials).toHaveLength(0);
  });

  it('starts and skips with space', () => {
    const { result } = mount();

    act(() => {
      result.current.onKeyDown(key(' '));
    });

    expect(result.current.phase).toBe('awaiting');

    act(() => {
      result.current.respond('paper');
    });

    act(() => {
      result.current.onKeyDown(key('Enter'));
    });

    expect(result.current.phase).toBe('awaiting');
  });

  it('restarts with space once the block is done', () => {
    const { result } = mount();

    act(() => {
      result.current.setTotalTrials(10);
      result.current.start();
    });

    for (let i = 0; i < 10; i++) {
      act(() => {
        result.current.respond('paper');
      });
      act(() => {
        result.current.advance();
      });
    }

    expect(result.current.phase).toBe('done');

    act(() => {
      result.current.onKeyDown(key(' '));
    });

    expect(result.current.phase).toBe('awaiting');
    expect(result.current.trials).toHaveLength(0);
  });

  it('resets with the R key', () => {
    const { result } = mount();

    act(() => {
      result.current.start();
    });

    act(() => {
      result.current.onKeyDown(key('r'));
    });

    expect(result.current.phase).toBe('idle');
  });
});
