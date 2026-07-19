import { createInitialState, gameReducer } from '../reducer';

describe('externalities reducer', () => {
  it('creates an initial pick state at round 1', () => {
    const state = createInitialState();
    expect(state.phase).toBe('pick');
    expect(state.round).toBe(1);
    expect(state.q).toBeNull();
    expect(state.results).toEqual([]);
  });

  it('resolves a pick into a round result', () => {
    const state = gameReducer(createInitialState(), {
      type: 'PICK_OUTPUT',
      q: 5,
    });
    expect(state.phase).toBe('result');
    expect(state.result?.q).toBe(5);
    expect(state.result?.profit).toBe(62.5);
    expect(state.result?.socialWelfare).toBe(42.5);
  });

  it('tags phase 2 picks with the Pigouvian tax', () => {
    let state = createInitialState();
    for (let round = 1; round <= 3; round++) {
      state = gameReducer(state, { type: 'PICK_OUTPUT', q: 5 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    state = gameReducer(state, { type: 'PICK_OUTPUT', q: 5 });
    expect(state.result?.phase).toBe(2);
    expect(state.result?.taxPaid).toBe(20);
  });

  it('ignores a pick while showing a result', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PICK_OUTPUT',
      q: 5,
    });
    const before = state.result;
    const next = gameReducer(state, { type: 'PICK_OUTPUT', q: 7 });
    expect(next.result).toBe(before);
  });

  it('ignores NEXT_ROUND before any result', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.round).toBe(1);
    expect(state.phase).toBe('pick');
  });

  it('advances rounds through both phases to completion', () => {
    let state = createInitialState();
    for (let round = 1; round <= 6; round++) {
      state = gameReducer(state, { type: 'PICK_OUTPUT', q: 5 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(6);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'PICK_OUTPUT', q: 5 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset).toEqual(createInitialState());
  });
});
