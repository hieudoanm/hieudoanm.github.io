import { EPSILONS, TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

describe('elasticity reducer', () => {
  it('creates an initial state on round one', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.epsilon).toBe(EPSILONS[0]);
    expect(state.trials).toEqual([]);
  });

  it('records a legal price as a trial', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 5 });
    expect(state.trials).toHaveLength(1);
    expect(state.trials[0].price).toBe(5);
    expect(state.trials[0].quantity).toBeGreaterThan(0);
    expect(state.bestRevenue).toBe(state.trials[0].revenue);
  });

  it('ignores an out-of-range price', () => {
    let state = createInitialState();
    const before = state;
    state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 999 });
    expect(state.trials).toEqual(before.trials);
  });

  it('accumulates trials and tracks the best revenue', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 30 });
    const low = state.bestRevenue;
    state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 1 });
    expect(state.trials).toHaveLength(2);
    expect(state.bestRevenue).toBeGreaterThanOrEqual(low);
  });

  it('advances through every round and completes', () => {
    let state = createInitialState();
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 10 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('reveal');
    expect(state.rounds).toHaveLength(TOTAL_ROUNDS);
  });

  it('does not advance a round without submissions', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.round).toBe(1);
    expect(state.trials).toEqual([]);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 5 });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.rounds).toEqual([]);
    expect(reset.trials).toEqual([]);
    expect(reset.round).toBe(1);
  });
});
