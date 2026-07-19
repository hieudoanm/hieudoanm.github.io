import { TOTAL_ROUNDS, TRADEOFF_START } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

describe('monetary policy reducer', () => {
  it('starts in the setting phase on round one', () => {
    const state = createInitialState();
    expect(state.phase).toBe('setting');
    expect(state.round).toBe(1);
    expect(state.score).toBe(0);
  });

  it('checks a rate and reveals the deviation', () => {
    const state = gameReducer(createInitialState(), {
      type: 'CHECK_RATE',
      rate: 8.5,
    });
    expect(state.phase).toBe('reveal');
    expect(state.result?.taylorRate).toBe(8.5);
    expect(state.result?.deviation).toBe(0);
    expect(state.score).toBe(0);
  });

  it('accumulates score across checks', () => {
    const state = gameReducer(createInitialState(), {
      type: 'CHECK_RATE',
      rate: 11,
    });
    expect(state.result?.deviation).toBe(2.5);
    expect(state.score).toBe(2.5);
  });

  it('ignores checks outside the setting phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'CHECK_RATE',
      rate: 8.5,
    });
    const next = gameReducer(state, { type: 'CHECK_RATE', rate: 0 });
    expect(next.result).toBe(state.result);
  });

  it('ignores non-finite rates', () => {
    const state = gameReducer(createInitialState(), {
      type: 'CHECK_RATE',
      rate: NaN,
    });
    expect(state.phase).toBe('setting');
  });

  it('advances rounds and opens the tradeoff phase after the last scenario', () => {
    let state = createInitialState();
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'CHECK_RATE', rate: 2 });
      state = gameReducer(state, { type: 'NEXT' });
    }
    expect(state.phase).toBe('tradeoff');
    expect(state.history).toHaveLength(TOTAL_ROUNDS);
    expect(state.tradeoff).toEqual(TRADEOFF_START);
  });

  it('adjusts rates only in the tradeoff phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'ADJUST_RATE',
      delta: 0.5,
    });
    expect(state.tradeoff).toEqual(TRADEOFF_START);
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'CHECK_RATE', rate: 2 });
      state = gameReducer(state, { type: 'NEXT' });
    }
    state = gameReducer(state, { type: 'ADJUST_RATE', delta: -0.5 });
    expect(state.tradeoff.rate).toBe(3.5);
    expect(state.tradeoff.stepsUsed).toBe(1);
  });

  it('rejects invalid adjustment steps', () => {
    let state = createInitialState();
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'CHECK_RATE', rate: 2 });
      state = gameReducer(state, { type: 'NEXT' });
    }
    const before = state.tradeoff;
    const next = gameReducer(state, { type: 'ADJUST_RATE', delta: 1 });
    expect(next.tradeoff).toBe(before);
  });

  it('finalizes with the tradeoff distance folded into the score', () => {
    let state = createInitialState();
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'CHECK_RATE', rate: 2 });
      state = gameReducer(state, { type: 'NEXT' });
    }
    state = gameReducer(state, { type: 'NEXT' });
    expect(state.phase).toBe('done');
    expect(state.tradeoffDistance).toBe(2.7);
    expect(state.score).toBeGreaterThan(0);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'CHECK_RATE',
      rate: 8.5,
    });
    state = gameReducer(state, { type: 'NEXT' });
    const next = gameReducer(state, { type: 'RESET' });
    expect(next.phase).toBe('setting');
    expect(next.round).toBe(1);
    expect(next.history).toEqual([]);
    expect(next.score).toBe(0);
  });
});
