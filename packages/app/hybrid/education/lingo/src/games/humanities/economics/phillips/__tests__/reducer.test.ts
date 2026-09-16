import { createInitialState, gameReducer, GameState } from '../reducer';

describe('phillips reducer', () => {
  it('selects a policy in pick phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SELECT_POLICY',
      policy: 'expansion',
    });
    expect(state.policy).toBe('expansion');
  });

  it('ignores policy selection outside pick phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_POLICY',
      policy: 'expansion',
    });
    state = gameReducer(state, { type: 'CHECK' });
    const next = gameReducer(state, {
      type: 'SELECT_POLICY',
      policy: 'contraction',
    });
    expect(next.policy).toBe('expansion');
  });

  it('computes short-run and long-run values on CHECK', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_POLICY',
      policy: 'expansion',
    });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.phase).toBe('reveal');
    expect(state.newInflation).not.toBeNull();
    expect(state.newUnemployment).not.toBeNull();
    expect(state.lrInflation).not.toBeNull();
    expect(state.history).toHaveLength(1);
  });

  it('advances rounds and completes after all rounds', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = gameReducer(state, { type: 'SELECT_POLICY', policy: 'hold' });
      state = gameReducer(state, { type: 'CHECK' });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.history).toHaveLength(5);
  });

  it('carries over inflation expectations from the previous round', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SELECT_POLICY', policy: 'expansion' });
    state = gameReducer(state, { type: 'CHECK' });
    const carriedInflation = state.newInflation;
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.expectationsInflation).toBe(carriedInflation);
  });

  it('clamps anchor between 0 and 100', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_ANCHOR',
      anchor: 150,
    });
    expect(state.anchor).toBe(100);
    state = gameReducer(state, { type: 'SET_ANCHOR', anchor: -10 });
    expect(state.anchor).toBe(0);
  });

  it('ignores CHECK without a selected policy', () => {
    const state = gameReducer(createInitialState(), { type: 'CHECK' });
    expect(state.phase).toBe('pick');
    expect(state.newInflation).toBeNull();
  });

  it('ignores NEXT_ROUND outside reveal phase', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('pick');
  });

  it('resets to initial state', () => {
    let state = gameReducer(createInitialState() as GameState, {
      type: 'SELECT_POLICY',
      policy: 'contraction',
    });
    state = gameReducer(state, { type: 'CHECK' });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('pick');
    expect(state.round).toBe(1);
    expect(state.history).toEqual([]);
    expect(state.policy).toBeNull();
  });
});
