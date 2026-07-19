import { createInitialState, gameReducer } from '../reducer';

describe('perfect competition reducer', () => {
  it('starts in the choose phase with the first market price', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.price).toBe(20);
    expect(state.chosenQ).toBeNull();
    expect(state.results).toEqual([]);
  });

  it('reveals profit and optimal output when the player submits q', () => {
    const next = gameReducer(createInitialState(), { type: 'SUBMIT_Q', q: 6 });
    expect(next.phase).toBe('reveal');
    expect(next.result?.price).toBe(20);
    expect(next.result?.optimalQ).toBe(6);
    expect(next.result?.profit).toBe(-14);
    expect(next.totalProfit).toBe(-14);
    expect(next.optimalCount).toBe(1);
  });

  it('flags output that misses P = MC', () => {
    const next = gameReducer(createInitialState(), { type: 'SUBMIT_Q', q: 30 });
    expect(next.result?.optimalQ).toBe(6);
    expect(next.result?.chosenQ).toBe(30);
    expect(next.optimalCount).toBe(0);
  });

  it('advances to the next round with the next price', () => {
    let state = gameReducer(createInitialState(), { type: 'SUBMIT_Q', q: 6 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.round).toBe(2);
    expect(state.price).toBe(30);
    expect(state.phase).toBe('choose');
    expect(state.chosenQ).toBeNull();
  });

  it('completes the game after six rounds', () => {
    let state = createInitialState();
    const choices = [6, 11, 18, 10, 6, 18];
    for (const q of choices) {
      state = gameReducer(state, { type: 'SUBMIT_Q', q });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(6);
    expect(state.optimalCount).toBe(6);
  });

  it('ignores submissions outside the choose phase', () => {
    let state = gameReducer(createInitialState(), { type: 'SUBMIT_Q', q: 6 });
    const before = state;
    const next = gameReducer(state, { type: 'SUBMIT_Q', q: 11 });
    expect(next).toBe(before);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), { type: 'SUBMIT_Q', q: 6 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.round).toBe(1);
    expect(reset.phase).toBe('choose');
    expect(reset.results).toEqual([]);
    expect(reset.totalProfit).toBe(0);
  });
});
