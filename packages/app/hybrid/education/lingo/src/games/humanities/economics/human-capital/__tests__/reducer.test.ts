import { CHALLENGES, TOTAL_CHALLENGES } from '../constants';
import { optimalYears } from '../game';
import { createInitialState, gameReducer } from '../reducer';

describe('human capital reducer', () => {
  it('starts in a free sandbox with default parameters', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.mode).toBe('sandbox');
    expect(state.r).toBe(8);
    expect(state.costPerYear).toBe(5000);
    expect(state.w0).toBe(30000);
    expect(state.years).toBe(8);
    expect(state.score).toBe(0);
  });

  it('updates the years slider', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_YEARS',
      value: 12,
    });
    expect(state.years).toBe(12);
  });

  it('ignores parameter edits once a challenge is running', () => {
    const base = createInitialState();
    const started = gameReducer(base, {
      type: 'CHECK',
    });
    const challenge = gameReducer(started, { type: 'START_CHALLENGE' });
    const next = gameReducer(challenge, { type: 'SET_COST', value: 0 });
    expect(next.costPerYear).toBe(CHALLENGES[0].costPerYear);
  });

  it('checks a sandbox choice without scoring or advancing rounds', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_YEARS',
      value: 0,
    });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.phase).toBe('reveal');
    expect(state.mode).toBe('sandbox');
    expect(state.result?.score).toBeNull();
    expect(state.result?.npv).toBeCloseTo(386357.47, -1);
    expect(state.results).toEqual([]);
    const back = gameReducer(state, { type: 'BACK_TO_CHOOSE' });
    expect(back.phase).toBe('choose');
    expect(back.result).toBeNull();
  });

  it('starts a challenge with the first preset parameters', () => {
    const base = gameReducer(createInitialState(), { type: 'CHECK' });
    const state = gameReducer(base, { type: 'START_CHALLENGE' });
    expect(state.phase).toBe('choose');
    expect(state.mode).toBe('challenge');
    expect(state.round).toBe(1);
    expect(state.r).toBe(CHALLENGES[0].r);
    expect(state.costPerYear).toBe(CHALLENGES[0].costPerYear);
    expect(state.w0).toBe(CHALLENGES[0].w0);
    expect(state.years).toBe(0);
  });

  it('scores a challenge choice against the optimal years', () => {
    const challenge = CHALLENGES[0];
    let state = gameReducer(createInitialState(), { type: 'CHECK' });
    state = gameReducer(state, { type: 'START_CHALLENGE' });
    state = gameReducer(state, {
      type: 'SET_YEARS',
      value: optimalYears(challenge.w0, challenge.r, challenge.costPerYear),
    });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.phase).toBe('reveal');
    expect(state.result?.score).toBe(100);
    expect(state.result?.optimalYears).toBe(16);
    expect(state.results).toHaveLength(1);
  });

  it('completes all challenge rounds with a perfect total score', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHECK' });
    state = gameReducer(state, { type: 'START_CHALLENGE' });
    for (let round = 1; round <= TOTAL_CHALLENGES; round += 1) {
      const c = CHALLENGES[round - 1];
      state = gameReducer(state, {
        type: 'SET_YEARS',
        value: optimalYears(c.w0, c.r, c.costPerYear),
      });
      state = gameReducer(state, { type: 'CHECK' });
      state = gameReducer(state, { type: 'NEXT_CHALLENGE' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_CHALLENGES);
    expect(state.score).toBe(TOTAL_CHALLENGES * 100);
  });

  it('ignores NEXT_CHALLENGE outside a challenge reveal', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_CHALLENGE' });
    expect(state.phase).toBe('choose');
  });

  it('resets to the initial sandbox', () => {
    let state = gameReducer(createInitialState(), { type: 'CHECK' });
    state = gameReducer(state, { type: 'START_CHALLENGE' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.phase).toBe('choose');
    expect(reset.mode).toBe('sandbox');
    expect(reset.results).toEqual([]);
    expect(reset.score).toBe(0);
  });
});
