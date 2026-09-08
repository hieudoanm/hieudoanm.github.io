import { createInitialState, gameReducer } from '../reducer';
import type { GameState } from '../reducer';

const setWeight = (
  state: GameState,
  asset: 'tech' | 'property' | 'bonds',
  v: number
): GameState => gameReducer(state, { type: 'SET_WEIGHT', asset, value: v });

const setChallengeWeight = (state: GameState, w: number): GameState =>
  gameReducer(state, { type: 'SET_CHALLENGE_WEIGHT', value: w });

const check = (state: GameState): GameState =>
  gameReducer(state, { type: 'SUBMIT_CHECK' });

const next = (state: GameState): GameState =>
  gameReducer(state, { type: 'NEXT' });

describe('portfolio reducer', () => {
  it('starts at round 1 in the choose phase', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.weights).toEqual({
      tech: 1 / 3,
      property: 1 / 3,
      bonds: 1 / 3,
    });
    expect(state.totalScore).toBe(0);
  });

  it('updates a single weight slider', () => {
    const state = setWeight(createInitialState(), 'tech', 90);
    expect(state.weights.tech).toBe(90);
    expect(state.weights.bonds).toBe(1 / 3);
  });

  it('clamps slider values into the 0–100 range', () => {
    const state = setWeight(createInitialState(), 'tech', 150);
    expect(state.weights.tech).toBe(100);
  });

  it('applies a fixed preset', () => {
    const state = gameReducer(createInitialState(), {
      type: 'APPLY_PRESET',
      preset: 'all-tech',
    });
    expect(state.weights).toEqual({ tech: 1, property: 0, bonds: 0 });
  });

  it('computes the minimum-variance preset', () => {
    const state = gameReducer(createInitialState(), {
      type: 'APPLY_PRESET',
      preset: 'min-variance',
    });
    const total =
      state.weights.tech + state.weights.property + state.weights.bonds;
    expect(total).toBeCloseTo(1, 6);
    expect(state.weights.bonds).toBeGreaterThan(0.5);
  });

  it('clamps the number of assets', () => {
    const low = gameReducer(createInitialState(), { type: 'SET_N', value: -3 });
    expect(low.nAssets).toBe(1);
    const high = gameReducer(createInitialState(), {
      type: 'SET_N',
      value: 99,
    });
    expect(high.nAssets).toBe(20);
  });

  it('scores a perfect challenge hit at the ideal weight', () => {
    const state = setChallengeWeight(createInitialState(), 0.02);
    const revealed = check(state);
    expect(revealed.phase).toBe('reveal');
    expect(revealed.result?.round).toBe(1);
    expect(revealed.result?.idealW).toBeCloseTo(0.02, 12);
    expect(revealed.result?.playerW).toBe(0.02);
    expect(revealed.result?.score).toBe(5);
  });

  it('scores the default weight against the ideal', () => {
    const revealed = check(createInitialState());
    expect(revealed.result?.idealW).toBeCloseTo(0.02, 12);
    expect(revealed.result?.playerW).toBe(0.5);
    expect(revealed.result?.score).toBe(0);
    expect(revealed.result?.sigma).toBeCloseTo(Math.sqrt(0.016875), 9);
  });

  it('ignores submissions outside the choose phase', () => {
    const revealed = check(createInitialState());
    const again = check(revealed);
    expect(again.result).toBe(revealed.result);
  });

  it('ignores weight changes outside the choose phase', () => {
    const revealed = check(createInitialState());
    const moved = setWeight(revealed, 'tech', 99);
    expect(moved.weights.tech).toBe(revealed.weights.tech);
  });

  it('advances through all five rounds and completes', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = setChallengeWeight(state, 0.02);
      state = check(state);
      expect(state.result?.round).toBe(round);
      state = next(state);
      if (round < 5) {
        expect(state.phase).toBe('choose');
        expect(state.round).toBe(round + 1);
      }
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(5);
  });

  it('ignores NEXT outside the reveal phase', () => {
    const state = next(createInitialState());
    expect(state.round).toBe(1);
    expect(state.phase).toBe('choose');
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = check(state);
    state = next(state);
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.round).toBe(1);
    expect(reset.phase).toBe('choose');
    expect(reset.results).toEqual([]);
    expect(reset.totalScore).toBe(0);
  });
});
