import { PRESETS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

describe('evolution reducer', () => {
  it('creates the default hawk-dove state', () => {
    const state = createInitialState();
    expect(state.preset).toBe('hawk-dove');
    expect(state.startP).toBe(0.5);
    expect(state.p).toBe(0.5);
    expect(state.generation).toBe(0);
    expect(state.converged).toBe(false);
  });

  it('selects a preset and restarts from its start share', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SELECT_PRESET',
      preset: 'prisoner',
    });
    expect(state.preset).toBe('prisoner');
    expect(state.startP).toBe(0.5);
    expect(state.p).toBe(0.5);
    expect(state.generation).toBe(0);
  });

  it('sets the start share and restarts the population', () => {
    let state = gameReducer(createInitialState(), { type: 'STEP', n: 10 });
    state = gameReducer(state, { type: 'SET_START', p: 0.2 });
    expect(state.startP).toBe(0.2);
    expect(state.p).toBe(0.2);
    expect(state.generation).toBe(0);
  });

  it('clamps an out-of-range start share', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_START',
      p: 2,
    });
    expect(state.startP).toBe(1);
  });

  it('ignores a non-finite start share', () => {
    const state = createInitialState();
    const next = gameReducer(state, { type: 'SET_START', p: Number.NaN });
    expect(next).toBe(state);
  });

  it('advances generations and tracks the observed share', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'STEP', n: 100 });
    expect(state.generation).toBe(100);
    expect(state.p).toBeCloseTo(2 / 3, 2);
    expect(state.converged).toBe(true);
  });

  it('ignores non-positive or non-integer step sizes', () => {
    const state = createInitialState();
    expect(gameReducer(state, { type: 'STEP', n: 0 })).toBe(state);
    expect(gameReducer(state, { type: 'STEP', n: -3 })).toBe(state);
    expect(gameReducer(state, { type: 'STEP', n: 2.5 })).toBe(state);
  });

  it('keeps the fitness snapshot current at the observed share', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'STEP', n: 1 });
    expect(state.lastFitness.mean).toBeGreaterThan(0);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PRESET',
      preset: 'coordination',
    });
    state = gameReducer(state, { type: 'STEP', n: 10 });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.preset).toBe('hawk-dove');
    expect(reset.p).toBe(PRESETS['hawk-dove'].startP);
    expect(reset.generation).toBe(0);
  });
});
