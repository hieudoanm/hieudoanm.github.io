import { createInitialState, gameReducer } from '../reducer';

describe('oligopoly reducer', () => {
  it('starts in the choose phase of round one', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
    expect(state.totalProfitA).toBe(0);
  });

  it('computes the AI reply and profits on submission', () => {
    let state = gameReducer(createInitialState(), { type: 'SUBMIT_Q', qA: 30 });
    expect(state.phase).toBe('reveal');
    expect(state.qA).toBe(30);
    expect(state.qB).toBe(30);
    expect(state.pPrice).toBe(40);
    expect(state.result?.price).toBe(40);
    expect(state.result?.profitA).toBe(900);
    expect(state.result?.profitB).toBe(900);
  });

  it('clamps the submitted quantity to the feasible range', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_Q',
      qA: 999,
    });
    expect(state.qA).toBe(40);
    expect(state.qB).toBe(25);
    let low = gameReducer(createInitialState(), { type: 'SUBMIT_Q', qA: -5 });
    expect(low.qA).toBe(0);
    expect(low.qB).toBe(40);
  });

  it('ignores submissions outside the choose phase', () => {
    let state = gameReducer(createInitialState(), { type: 'SUBMIT_Q', qA: 30 });
    const result = state.result;
    const next = gameReducer(state, { type: 'SUBMIT_Q', qA: 10 });
    expect(next.result).toBe(result);
  });

  it('advances one round at a time', () => {
    let state = gameReducer(createInitialState(), { type: 'SUBMIT_Q', qA: 30 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(2);
    expect(state.results).toHaveLength(1);
    expect(state.totalProfitA).toBe(900);
    expect(state.qA).toBeNull();
    expect(state.result).toBeNull();
  });

  it('ignores NEXT_ROUND before any submission', () => {
    const state = createInitialState();
    expect(gameReducer(state, { type: 'NEXT_ROUND' })).toBe(state);
  });

  it('completes the game after the final round', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = gameReducer(state, { type: 'SUBMIT_Q', qA: 30 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.round).toBe(5);
    expect(state.results).toHaveLength(5);
    expect(state.totalProfitA).toBe(4500);
    expect(state.totalProfitB).toBe(4500);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), { type: 'SUBMIT_Q', qA: 30 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.phase).toBe('choose');
    expect(reset.round).toBe(1);
    expect(reset.results).toEqual([]);
    expect(reset.totalProfitA).toBe(0);
    expect(reset.totalProfitB).toBe(0);
  });
});
