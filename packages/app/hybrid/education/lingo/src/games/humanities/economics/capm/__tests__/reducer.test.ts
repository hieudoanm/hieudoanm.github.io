import { createInitialState, gameReducer } from '../reducer';
import type { GameState } from '../types';

const submitWeight = (state: GameState, w: number): GameState =>
  gameReducer(state, { type: 'SUBMIT_PORTFOLIO', w });

const submitBeta = (state: GameState, input: number): GameState =>
  gameReducer(state, { type: 'SUBMIT_BETA', input });

const nextRound = (state: GameState): GameState =>
  gameReducer(state, { type: 'NEXT' });

describe('capm reducer', () => {
  it('starts at round 1 in the choose phase', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
    expect(state.totalScore).toBe(0);
  });

  it('scores a portfolio submission against the target sigma', () => {
    const state = submitWeight(createInitialState(), 0.4);
    expect(state.phase).toBe('reveal');
    expect(state.result?.type).toBe('portfolio');
    expect(state.result?.target).toBe(0.1);
    expect(state.result?.onTarget).toBe(true);
    expect(state.result?.stats?.eR).toBeCloseTo(0.072, 6);
    expect(state.result?.stats?.sigma).toBeCloseTo(0.101193, 6);
    expect(state.result?.score).toBeCloseTo(5.7614, 3);
  });

  it('ignores a beta submission in a portfolio round', () => {
    const state = submitBeta(createInitialState(), 0.065);
    expect(state.phase).toBe('choose');
    expect(state.result).toBeNull();
  });

  it('advances through the five portfolio rounds', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = submitWeight(state, 0.4);
      expect(state.result?.type).toBe('portfolio');
      state = nextRound(state);
      expect(state.phase).toBe('choose');
      expect(state.round).toBe(Math.min(round + 1, 6));
    }
    expect(state.round).toBe(6);
    expect(state.results).toHaveLength(5);
  });

  it('scores a beta round against the CAPM model', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = submitWeight(state, 0.4);
      state = nextRound(state);
    }
    state = submitBeta(state, 0.065);
    expect(state.phase).toBe('reveal');
    expect(state.result?.type).toBe('beta');
    expect(state.result?.beta).toBe(0.5);
    expect(state.result?.model).toBe(0.065);
    expect(state.result?.score).toBe(5);
  });

  it('ignores a portfolio submission in a beta round', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = submitWeight(state, 0.4);
      state = nextRound(state);
    }
    const before = state;
    const after = submitWeight(state, 0.4);
    expect(after.result).toBe(before.result);
    expect(after.phase).toBe('choose');
  });

  it('ignores NEXT outside the reveal phase', () => {
    let state = submitWeight(createInitialState(), 0.4);
    const revealed = state;
    state = nextRound(state);
    expect(state.phase).toBe('choose');
    state = nextRound(state);
    expect(state.phase).toBe('choose');
    expect(state.result).toBeNull();
    expect(state.results).toHaveLength(revealed.results.length + 1);
  });

  it('completes the game after all seven rounds', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = submitWeight(state, 0.4);
      state = nextRound(state);
    }
    state = submitBeta(state, 0.065);
    state = nextRound(state);
    state = submitBeta(state, 0.135);
    state = nextRound(state);
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(7);
    expect(state.totalScore).toBeCloseTo(19.7614, 3);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = submitWeight(state, 0.4);
    state = nextRound(state);
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.round).toBe(1);
    expect(reset.results).toEqual([]);
    expect(reset.totalScore).toBe(0);
    expect(reset.phase).toBe('choose');
  });
});
