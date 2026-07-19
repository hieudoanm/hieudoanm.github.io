import { TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

describe('monopoly reducer', () => {
  it('reveals the computed round result after submitting an output', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_OUTPUT',
      q: 40,
    });
    expect(state.phase).toBe('reveal');
    expect(state.result?.round).toBe(1);
    expect(state.result?.q).toBe(40);
    expect(state.result?.price).toBe(60);
    expect(state.result?.tr).toBe(2400);
    expect(state.result?.tc).toBe(800);
    expect(state.result?.profit).toBe(1600);
    expect(state.result?.dwl).toBe(800);
    expect(state.result?.guidance).toBe('optimal');
  });

  it('ignores submissions outside the choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_OUTPUT',
      q: 40,
    });
    const before = state;
    state = gameReducer(state, { type: 'SUBMIT_OUTPUT', q: 20 });
    expect(state).toBe(before);
  });

  it('advances through six rounds and completes the game', () => {
    let state = createInitialState();
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'SUBMIT_OUTPUT', q: 40 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_ROUNDS);
    expect(state.results[0]?.profit).toBe(1600);
  });

  it('does nothing on NEXT_ROUND without a result', () => {
    const before = createInitialState();
    const next = gameReducer(before, { type: 'NEXT_ROUND' });
    expect(next).toBe(before);
  });

  it('toggles the comparison only once the game is complete', () => {
    let state = gameReducer(createInitialState(), {
      type: 'TOGGLE_COMPARISON',
    });
    expect(state.showComparison).toBe(false);

    state = gameReducer(state, { type: 'SUBMIT_OUTPUT', q: 40 });
    state = gameReducer(state, { type: 'TOGGLE_COMPARISON' });
    expect(state.showComparison).toBe(false);

    for (let round = 1; round < TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'SUBMIT_OUTPUT', q: 40 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    state = gameReducer(state, { type: 'SUBMIT_OUTPUT', q: 40 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('done');

    state = gameReducer(state, { type: 'TOGGLE_COMPARISON' });
    expect(state.showComparison).toBe(true);
    state = gameReducer(state, { type: 'TOGGLE_COMPARISON' });
    expect(state.showComparison).toBe(false);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_OUTPUT', q: 40 });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.phase).toBe('choose');
    expect(reset.round).toBe(1);
    expect(reset.result).toBeNull();
    expect(reset.results).toEqual([]);
    expect(reset.showComparison).toBe(false);
  });
});
