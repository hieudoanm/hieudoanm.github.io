import { createInitialState, gameReducer } from '../reducer';
import { CHALLENGES } from '../constants';

describe('opportunity cost reducer', () => {
  it('starts in sandbox phase with default values', () => {
    const state = createInitialState();
    expect(state.phase).toBe('sandbox');
    expect(state.round).toBe(1);
    expect(state.score).toBe(0);
    expect(state.sandbox.wages).toBe(18);
  });

  it('updates sandbox params', () => {
    const state = gameReducer(createInitialState(), {
      type: 'UPDATE_SANDBOX',
      params: { wages: 25 },
    });
    expect(state.sandbox.wages).toBe(25);
    expect(state.sandbox.hours).toBe(10);
  });

  it('transitions to challenge phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGES',
    });
    expect(state.phase).toBe('challenge');
    expect(state.round).toBe(1);
    expect(state.score).toBe(0);
  });

  it('awards a point for correct picks', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGES',
    });
    state = gameReducer(state, {
      type: 'PICK',
      answer: CHALLENGES[0].correctAnswer,
    });
    expect(state.score).toBe(1);
    expect(state.selected).toBe(CHALLENGES[0].correctAnswer);
  });

  it('does not award points for wrong picks', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGES',
    });
    const wrong =
      CHALLENGES[0].correctAnswer === 'A' ? ('B' as const) : ('A' as const);
    state = gameReducer(state, { type: 'PICK', answer: wrong });
    expect(state.score).toBe(0);
  });

  it('ignores picks outside challenge phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'PICK',
      answer: 'A',
    });
    expect(state.selected).toBeNull();
  });

  it('ignores double picks in same round', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGES',
    });
    state = gameReducer(state, { type: 'PICK', answer: 'A' });
    const before = state;
    state = gameReducer(state, { type: 'PICK', answer: 'B' });
    expect(state.selected).toBe(before.selected);
  });

  it('advances through all rounds to done', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGES',
    });
    for (let i = 0; i < 5; i++) {
      state = gameReducer(state, {
        type: 'PICK',
        answer: CHALLENGES[i].correctAnswer,
      });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.score).toBe(5);
  });

  it('ignores NEXT_ROUND without a selection', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGES',
    });
    const before = state;
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state).toEqual(before);
  });

  it('resets to initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGES',
    });
    state = gameReducer(state, { type: 'PICK', answer: 'A' });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('sandbox');
    expect(state.round).toBe(1);
    expect(state.score).toBe(0);
  });
});
