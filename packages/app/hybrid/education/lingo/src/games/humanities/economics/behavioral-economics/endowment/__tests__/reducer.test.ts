import { TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  const { ITEMS } = jest.requireActual('../constants');
  return {
    ...actual,
    nextItem: () => ITEMS[0],
  };
});

describe('endowment reducer', () => {
  it('starts a round in the WTA phase with an item', () => {
    const state = createInitialState();
    const started = gameReducer(state, { type: 'START_ROUND', rand: 0.5 });
    expect(started.phase).toBe('wta');
    expect(started.item.id).toBeDefined();
    expect(started.wta).toBeNull();
    expect(started.wtp).toBeNull();
  });

  it('moves to the WTP phase after submitting the WTA', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rand: 0.5,
    });
    state = gameReducer(state, { type: 'SUBMIT_WTA', value: 8 });
    expect(state.phase).toBe('wtp');
    expect(state.wta).toBe(8);
  });

  it('reveals a round result after submitting the WTP', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rand: 0.5,
    });
    state = gameReducer(state, { type: 'SUBMIT_WTA', value: 8 });
    state = gameReducer(state, { type: 'SUBMIT_WTP', value: 5 });
    expect(state.phase).toBe('reveal');
    expect(state.result).toEqual({
      round: 1,
      item: state.item,
      wta: 8,
      wtp: 5,
      gap: 3,
    });
  });

  it('floors a negative gap in the reveal', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rand: 0.5,
    });
    state = gameReducer(state, { type: 'SUBMIT_WTA', value: 2 });
    state = gameReducer(state, { type: 'SUBMIT_WTP', value: 9 });
    expect(state.result?.gap).toBe(0);
  });

  it('advances rounds and completes the game', () => {
    let state = createInitialState();
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'START_ROUND', rand: 0.5 });
      state = gameReducer(state, { type: 'SUBMIT_WTA', value: 7 });
      state = gameReducer(state, { type: 'SUBMIT_WTP', value: 4 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_ROUNDS);
  });

  it('ignores out-of-phase submissions', () => {
    const state = createInitialState();
    const skipped = gameReducer(state, { type: 'SUBMIT_WTP', value: 4 });
    expect(skipped.phase).toBe('wta');
    expect(skipped.wtp).toBeNull();
  });

  it('ignores NEXT_ROUND without a result', () => {
    const state = createInitialState();
    const unchanged = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(unchanged.round).toBe(1);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rand: 0.5,
    });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('wta');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
  });
});
