import { optimalBundle } from '../game';
import { SCENARIOS, TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer, GameState } from '../reducer';

const optimalIndex = (round: number): number => {
  const scenario = SCENARIOS[round - 1];
  const optimal = optimalBundle(scenario.pa, scenario.pc, scenario.income);
  return scenario.options.findIndex(
    (option) =>
      option.apples === optimal.apples && option.cookies === optimal.cookies
  );
};

describe('marginal utility reducer', () => {
  it('creates a lab state with default prices and income', () => {
    const state = createInitialState();
    expect(state.mode).toBe('lab');
    expect(state.pa).toBe(2);
    expect(state.pc).toBe(1);
    expect(state.income).toBe(10);
    expect(state.apples).toBe(0);
    expect(state.cookies).toBe(0);
  });

  it('updates prices and income in the lab mode', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_PRICE', good: 'apple', value: 3 });
    state = gameReducer(state, { type: 'SET_PRICE', good: 'cookie', value: 2 });
    state = gameReducer(state, { type: 'SET_INCOME', value: 12 });
    expect(state.pa).toBe(3);
    expect(state.pc).toBe(2);
    expect(state.income).toBe(12);
  });

  it('buys a unit when affordable and refuses overspending', () => {
    let state = createInitialState();
    for (let i = 0; i < 5; i++) {
      state = gameReducer(state, { type: 'BUY', good: 'apple' });
    }
    expect(state.apples).toBe(5);
    expect(state.cookies).toBe(0);
    const blocked = gameReducer(state, { type: 'BUY', good: 'apple' });
    expect(blocked.apples).toBe(5);
  });

  it('sells a unit but never below zero', () => {
    let state = gameReducer(createInitialState(), {
      type: 'BUY',
      good: 'cookie',
    });
    state = gameReducer(state, { type: 'SELL', good: 'cookie' });
    expect(state.cookies).toBe(0);
    const blocked = gameReducer(state, { type: 'SELL', good: 'cookie' });
    expect(blocked.cookies).toBe(0);
  });

  it('checks the allocation and records history', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'BUY', good: 'apple' });
    state = gameReducer(state, { type: 'BUY', good: 'apple' });
    state = gameReducer(state, { type: 'BUY', good: 'apple' });
    state = gameReducer(state, { type: 'BUY', good: 'cookie' });
    state = gameReducer(state, { type: 'BUY', good: 'cookie' });
    state = gameReducer(state, { type: 'BUY', good: 'cookie' });
    state = gameReducer(state, { type: 'BUY', good: 'cookie' });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.result?.score).toBe(100);
    expect(state.result?.optimal.apples).toBe(3);
    expect(state.result?.optimal.cookies).toBe(4);
    expect(state.history).toHaveLength(1);
  });

  it('clears a stale check when the allocation changes', () => {
    let state = gameReducer(createInitialState(), { type: 'CHECK' });
    expect(state.result).not.toBeNull();
    state = gameReducer(state, { type: 'BUY', good: 'apple' });
    expect(state.result).toBeNull();
  });

  it('switches to challenge mode and selects an option', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'challenge',
    });
    expect(state.mode).toBe('challenge');
    expect(state.phase).toBe('choose');
    state = gameReducer(state, { type: 'SET_OPTION', index: 2 });
    expect(state.selected).toBe(2);
  });

  it('ignores option selection outside the challenge choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'challenge',
    });
    state = gameReducer(state, { type: 'SET_OPTION', index: 1 });
    state = gameReducer(state, { type: 'SUBMIT_CHALLENGE' });
    const beforeSelected = state.selected;
    state = gameReducer(state, { type: 'SET_OPTION', index: 4 });
    expect(state.selected).toBe(beforeSelected);
  });

  it('grades a challenge submission against the optimum', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'challenge',
    });
    state = gameReducer(state, { type: 'SET_OPTION', index: optimalIndex(1) });
    state = gameReducer(state, { type: 'SUBMIT_CHALLENGE' });
    expect(state.phase).toBe('reveal');
    expect(state.challengeResult?.correct).toBe(true);
    expect(state.totalCorrect).toBe(1);
  });

  it('marks an incorrect challenge submission', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'challenge',
    });
    const wrong = (optimalIndex(1) + 1) % 5;
    state = gameReducer(state, { type: 'SET_OPTION', index: wrong });
    state = gameReducer(state, { type: 'SUBMIT_CHALLENGE' });
    expect(state.challengeResult?.correct).toBe(false);
    expect(state.totalCorrect).toBe(0);
  });

  it('advances challenge rounds and completes the game', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'challenge',
    });
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, {
        type: 'SET_OPTION',
        index: optimalIndex(round),
      });
      state = gameReducer(state, { type: 'SUBMIT_CHALLENGE' });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.totalCorrect).toBe(TOTAL_ROUNDS);
    expect(state.challengeHistory).toHaveLength(TOTAL_ROUNDS);
  });

  it('refuses to advance rounds without a submission', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'challenge',
    });
    const before = state;
    const next = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(next.round).toBe(before.round);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_MODE', mode: 'challenge' });
    state = gameReducer(state, { type: 'SET_OPTION', index: 0 });
    state = gameReducer(state, { type: 'SUBMIT_CHALLENGE' });
    const reset = gameReducer(state as GameState, { type: 'RESET' });
    expect(reset.mode).toBe('lab');
    expect(reset.apples).toBe(0);
    expect(reset.history).toEqual([]);
    expect(reset.round).toBe(1);
  });
});
