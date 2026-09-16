import { ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

describe('fiscal reducer', () => {
  it('starts on round 1 with the first gap profile', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.gap).toBe(100);
    expect(state.mpc).toBe(0.8);
  });

  it('submits spending and reveals the round result', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT',
      g: 20,
      tau: 0,
    });
    expect(state.phase).toBe('reveal');
    expect(state.result?.closingY).toBeCloseTo(100);
    expect(state.result?.gapResidual).toBeCloseTo(0);
    expect(state.result?.score).toBe(5);
    expect(state.result?.cost).toBe(20);
  });

  it('clamps levers into the allowed range', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT',
      g: 999,
      tau: -5,
    });
    expect(state.result?.g).toBe(250);
    expect(state.result?.tau).toBe(0);
  });

  it('ignores submissions outside the choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT',
      g: 20,
      tau: 0,
    });
    const before = state.result;
    state = gameReducer(state, { type: 'SUBMIT', g: 10, tau: 10 });
    expect(state.result).toBe(before);
  });

  it('advances to the next round profile', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT', g: 0, tau: 0 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.round).toBe(2);
    expect(state.gap).toBe(80);
    expect(state.mpc).toBe(0.6);
    expect(state.phase).toBe('choose');
  });

  it('accumulates results and completes across all rounds', () => {
    let state = createInitialState();
    for (let i = 0; i < ROUNDS.length; i++) {
      state = gameReducer(state, { type: 'SUBMIT', g: 0, tau: 0 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(ROUNDS.length);
    expect(state.totalScore).toBeCloseTo(18);
    expect(state.round).toBe(ROUNDS.length);
  });

  it('ignores NEXT_ROUND without a result', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.round).toBe(1);
    expect(state.phase).toBe('choose');
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT', g: 20, tau: 0 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    const next = gameReducer(state, { type: 'RESET' });
    expect(next.phase).toBe('choose');
    expect(next.round).toBe(1);
    expect(next.results).toEqual([]);
    expect(next.totalScore).toBe(0);
  });
});
