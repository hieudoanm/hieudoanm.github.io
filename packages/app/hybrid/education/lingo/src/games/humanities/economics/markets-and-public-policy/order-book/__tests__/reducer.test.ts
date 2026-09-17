import { START_MID, TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

describe('order book reducer', () => {
  it('creates an initial state with a balanced book', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.mid).toBe(START_MID);
    expect(state.cash).toBe(0);
    expect(state.position).toBe(0);
    expect(state.volume).toBe(0);
    expect(state.spreadCost).toBe(0);
    expect(state.roundResult).toBeNull();
  });

  it('fills a market buy at the ask and moves the mid up', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'buy-ask',
      step: 1,
    });
    expect(state.phase).toBe('reveal');
    expect(state.mid).toBe(101);
    expect(state.cash).toBe(-102);
    expect(state.position).toBe(1);
    expect(state.volume).toBe(1);
    expect(state.spreadCost).toBe(2);
    expect(state.roundResult).toMatchObject({
      round: 1,
      action: 'buy-ask',
      midBefore: 100,
      midAfter: 101,
      fill: 'buy',
      fillPrice: 102,
      delta: 1,
      spreadCost: 2,
      totalSpreadCost: 2,
    });
  });

  it('fills a market sell at the bid and moves the mid down', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'sell-bid',
      step: -1,
    });
    expect(state.mid).toBe(99);
    expect(state.cash).toBe(98);
    expect(state.position).toBe(-1);
    expect(state.spreadCost).toBe(2);
  });

  it('fills a posted buy when the new mid reaches its price', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'post-bid',
      step: 1,
    });
    expect(state.roundResult?.fill).toBe('buy');
    expect(state.roundResult?.fillPrice).toBe(101);
    expect(state.cash).toBe(-101);
    expect(state.position).toBe(1);
    expect(state.spreadCost).toBe(0);
  });

  it('leaves a posted buy resting when the mid falls away', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'post-bid',
      step: -1,
    });
    expect(state.roundResult?.fill).toBe('none');
    expect(state.roundResult?.fillPrice).toBeNull();
    expect(state.roundResult?.delta).toBe(0);
    expect(state.position).toBe(0);
    expect(state.volume).toBe(0);
  });

  it('fills a posted sell when the new mid falls to its price', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'post-ask',
      step: -1,
    });
    expect(state.roundResult?.fill).toBe('sell');
    expect(state.cash).toBe(101);
    expect(state.position).toBe(-1);
  });

  it('leaves a posted sell resting when the mid rises away', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'post-bid',
      step: 1,
    });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'post-ask',
      step: 1,
    });
    expect(state.mid).toBe(102);
    expect(state.roundResult?.fill).toBe('none');
    expect(state.position).toBe(1);
  });

  it('advances through all rounds and completes the game', () => {
    let state = createInitialState();
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, {
        type: 'SUBMIT_ACTION',
        action: 'buy-ask',
        step: 1,
      });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_ROUNDS);
  });

  it('ignores actions outside the choose phase', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'buy-ask',
      step: 1,
    });
    const before = state;
    const next = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'sell-bid',
      step: 1,
    });
    expect(next).toBe(before);
  });

  it('ignores NEXT_ROUND without a round result', () => {
    const state = createInitialState();
    expect(gameReducer(state, { type: 'NEXT_ROUND' })).toBe(state);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SUBMIT_ACTION',
      action: 'buy-ask',
      step: 1,
    });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset).toEqual(createInitialState());
  });
});
