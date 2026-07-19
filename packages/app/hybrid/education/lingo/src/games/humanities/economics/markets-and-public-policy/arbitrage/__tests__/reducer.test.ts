import { QUOTES, START_USD, TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

const play = (pathId: 'usd_eur_jpy_usd' | 'usd_jpy_eur_usd' | 'direct') => {
  let state = createInitialState();
  state = gameReducer(state, { type: 'PICK_PATH', pathId });
  return gameReducer(state, { type: 'EXECUTE', budget: 1000 });
};

describe('arbitrage reducer', () => {
  it('starts on the first quote with no path chosen', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.rates).toEqual(QUOTES[0]);
    expect(state.pathId).toBeNull();
    expect(state.results).toEqual([]);
  });

  it('records the chosen triangle path', () => {
    const state = gameReducer(createInitialState(), {
      type: 'PICK_PATH',
      pathId: 'usd_eur_jpy_usd',
    });
    expect(state.pathId).toBe('usd_eur_jpy_usd');
  });

  it('captures the spread on the profitable triangle', () => {
    const state = play('usd_eur_jpy_usd');
    expect(state.phase).toBe('reveal');
    expect(state.result?.pathId).toBe('usd_eur_jpy_usd');
    expect(state.result?.profit).toBe(9);
    expect(state.result?.profitable).toBe(true);
    expect(state.result?.impliedCross).toBe(125);
    expect(state.result?.ratio).toBeCloseTo(1.009, 6);
    expect(state.result?.bestPath).toBe('usd_eur_jpy_usd');
    expect(state.result?.arbitrageProfit).toBe(9);
  });

  it('pays a slight loss on the reversed triangle', () => {
    const state = play('usd_jpy_eur_usd');
    expect(state.result?.profit).toBeLessThan(0);
    expect(state.result?.profitable).toBe(false);
    expect(state.result?.bestPath).toBe('usd_eur_jpy_usd');
  });

  it('ignores execution before a path is picked', () => {
    const before = createInitialState();
    const state = gameReducer(before, { type: 'EXECUTE', budget: 1000 });
    expect(state).toBe(before);
    expect(state.result).toBeNull();
  });

  it('ignores execution with a non-positive budget', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PICK_PATH',
      pathId: 'direct',
    });
    const before = state;
    state = gameReducer(state, { type: 'EXECUTE', budget: 0 });
    expect(state).toBe(before);
  });

  it('advances to the next quote when a round ends', () => {
    let state = play('usd_eur_jpy_usd');
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(2);
    expect(state.rates).toEqual(QUOTES[1]);
    expect(state.results).toHaveLength(1);
    expect(state.totalProfit).toBe(9);
  });

  it('completes the lab after all five triangle rounds', () => {
    let state = createInitialState();
    for (const _ of Array.from({ length: TOTAL_ROUNDS })) {
      state = gameReducer(state, {
        type: 'PICK_PATH',
        pathId: 'usd_eur_jpy_usd',
      });
      state = gameReducer(state, { type: 'EXECUTE', budget: START_USD });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(5);
    expect(state.totalProfit).toBe(22);
  });

  it('ignores advancing when no result exists', () => {
    const before = createInitialState();
    const state = gameReducer(before, { type: 'NEXT_ROUND' });
    expect(state).toBe(before);
  });

  it('resets to the initial state', () => {
    let state = play('usd_eur_jpy_usd');
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
    expect(state.pathId).toBeNull();
  });
});
