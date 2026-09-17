import { DELTA_G_MAX, ROUNDS } from '../constants';
import { requiredDeltaG } from '../game';
import { createInitialState, gameReducer } from '../reducer';

describe('keynesian reducer', () => {
  it('starts in explore with default parameters', () => {
    const state = createInitialState();
    expect(state.phase).toBe('explore');
    expect(state.round).toBe(1);
    expect(state.mpc).toBe(0.8);
    expect(state.a).toBe(40);
    expect(state.investment).toBe(20);
    expect(state.government).toBe(40);
    expect(state.results).toEqual([]);
  });

  it('updates slider parameters in explore', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SET_EXPLORE_SLIDER',
      field: 'mpc',
      value: 0.75,
    });
    state = gameReducer(state, {
      type: 'SET_EXPLORE_SLIDER',
      field: 'a',
      value: 60,
    });
    state = gameReducer(state, {
      type: 'SET_EXPLORE_SLIDER',
      field: 'investment',
      value: 30,
    });
    state = gameReducer(state, {
      type: 'SET_EXPLORE_SLIDER',
      field: 'government',
      value: 10,
    });
    expect(state.mpc).toBe(0.75);
    expect(state.a).toBe(60);
    expect(state.investment).toBe(30);
    expect(state.government).toBe(10);
  });

  it('clamps slider parameters to their ranges', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_EXPLORE_SLIDER',
      field: 'a',
      value: 999,
    });
    expect(state.a).toBe(100);
    state = gameReducer(state, {
      type: 'SET_EXPLORE_SLIDER',
      field: 'a',
      value: -5,
    });
    expect(state.a).toBe(0);
  });

  it('ignores slider changes outside the explore phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGE',
    });
    const before = state.mpc;
    state = gameReducer(state, {
      type: 'SET_EXPLORE_SLIDER',
      field: 'mpc',
      value: 0.5,
    });
    expect(state.mpc).toBe(before);
  });

  it('starts the challenge on the first round profile', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGE',
    });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.mpc).toBe(0.8);
    expect(state.a).toBe(40);
    expect(state.investment).toBe(20);
    expect(state.government).toBe(40);
    expect(state.target).toBe(600);
    expect(state.gap).toBeCloseTo(100);
    expect(state.deltaG).toBe(0);
  });

  it('clamps the chosen delta G within its range', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGE',
    });
    state = gameReducer(state, { type: 'SET_DELTA_G', value: 999 });
    expect(state.deltaG).toBe(DELTA_G_MAX);
  });

  it('checks a closing delta G and reveals the round result', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGE',
    });
    state = gameReducer(state, { type: 'SET_DELTA_G', value: 20 });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.phase).toBe('reveal');
    expect(state.result?.requiredDeltaG).toBeCloseTo(20);
    expect(state.result?.chosenDeltaG).toBe(20);
    expect(state.result?.newEquilibrium).toBeCloseTo(600);
    expect(state.result?.plannedExpenditure).toBeCloseTo(600);
    expect(state.result?.unplannedInventory).toBeCloseTo(0);
    expect(state.result?.score).toBe(5);
  });

  it('ignores CHECK outside the choose phase', () => {
    const state = gameReducer(createInitialState(), { type: 'CHECK' });
    expect(state.phase).toBe('explore');
    expect(state.result).toBeNull();
  });

  it('ignores NEXT_ROUND without a result', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGE',
    });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.round).toBe(1);
    expect(state.phase).toBe('choose');
  });

  it('advances to the next round profile', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGE',
    });
    state = gameReducer(state, { type: 'SET_DELTA_G', value: 20 });
    state = gameReducer(state, { type: 'CHECK' });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(2);
    expect(state.mpc).toBe(0.9);
    expect(state.a).toBe(60);
    expect(state.investment).toBe(10);
    expect(state.government).toBe(30);
    expect(state.target).toBe(1500);
    expect(state.results).toHaveLength(1);
  });

  it('completes the challenge with perfect closing choices', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_CHALLENGE' });
    for (const profile of ROUNDS) {
      const required = Math.round(
        requiredDeltaG(
          profile.a,
          profile.mpc,
          profile.investment,
          profile.government,
          profile.target
        )
      );
      state = gameReducer(state, { type: 'SET_DELTA_G', value: required });
      state = gameReducer(state, { type: 'CHECK' });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(ROUNDS.length);
    expect(state.totalScore).toBe(ROUNDS.length * 5);
  });

  it('resets to the initial explore state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_CHALLENGE',
    });
    state = gameReducer(state, { type: 'SET_DELTA_G', value: 20 });
    state = gameReducer(state, { type: 'CHECK' });
    const next = gameReducer(state, { type: 'RESET' });
    expect(next.phase).toBe('explore');
    expect(next.round).toBe(1);
    expect(next.results).toEqual([]);
    expect(next.totalScore).toBe(0);
  });
});
