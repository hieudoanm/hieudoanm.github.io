import { SCENARIOS } from '../constants';
import { createInitialState, gameReducer, GameState } from '../reducer';

describe('is-lm reducer', () => {
  it('starts in explore phase with default sliders', () => {
    const state = createInitialState();
    expect(state.phase).toBe('explore');
    expect(state.a).toBe(6);
    expect(state.c).toBe(1);
  });

  it('updates sliders in explore phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_SLIDERS',
      a: 8,
      c: 0.5,
    });
    expect(state.a).toBe(8);
    expect(state.c).toBe(0.5);
  });

  it('ignores slider updates outside explore phase', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    state = gameReducer(state, { type: 'SET_SLIDERS', a: 9, c: 1 });
    expect(state.a).toBe(6);
  });

  it('starts the quiz on the first scenario', () => {
    const state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    expect(state.phase).toBe('quiz');
    expect(state.round).toBe(1);
    expect(state.current?.id).toBe(SCENARIOS[0].id);
  });

  it('scores a correct recession answer', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    state = gameReducer(state, {
      type: 'SUBMIT_ANSWER',
      isShift: 'right',
      lmShift: 'right',
    });
    expect(state.phase).toBe('reveal');
    expect(state.result?.correct).toBe(true);
    expect(state.result?.points).toBe(2);
  });

  it('awards partial credit for a half-correct answer', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    state = gameReducer(state, {
      type: 'SUBMIT_ANSWER',
      isShift: 'right',
      lmShift: 'left',
    });
    expect(state.result?.correct).toBe(false);
    expect(state.result?.points).toBe(1);
  });

  it('ignores answers outside the quiz phase', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    state = gameReducer(state, {
      type: 'SUBMIT_ANSWER',
      isShift: 'right',
      lmShift: 'right',
    });
    const before = state;
    const next = gameReducer(state, {
      type: 'SUBMIT_ANSWER',
      isShift: 'left',
      lmShift: 'left',
    });
    expect(next.result).toBe(before.result);
  });

  it('advances through all scenarios and completes', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    for (const s of SCENARIOS) {
      state = gameReducer(state, {
        type: 'SUBMIT_ANSWER',
        isShift: 'right',
        lmShift: 'right',
      });
      state = gameReducer(state, { type: 'NEXT_SCENARIO' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(SCENARIOS.length);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    state = gameReducer(state, {
      type: 'SUBMIT_ANSWER',
      isShift: 'right',
      lmShift: 'right',
    });
    state = gameReducer(state as GameState, { type: 'RESET' });
    expect(state.phase).toBe('explore');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
  });
});
