import { createInitialState, gameReducer } from '../reducer';
import { minimumTransferFor } from '../game';

describe('poverty-trap reducer', () => {
  it('creates an initial trapped simulation', () => {
    const state = createInitialState();
    expect(state.phase).toBe('simulate');
    expect(state.initialCapital).toBe(5);
    expect(state.simulation.trapPhase).toBe('trapped');
    expect(state.challenge.id).toBe('poor');
  });

  it('updates the simulation when the initial capital changes', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_INITIAL_CAPITAL', value: 60 });
    expect(state.initialCapital).toBe(60);
    expect(state.simulation.escaped).toBe(true);
    expect(state.scenario.threshold).toBeCloseTo(39.42, 1);
  });

  it('clamps the savings rate to its valid range', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_SAVINGS_RATE', value: 2 });
    expect(state.savingsRate).toBe(0.4);
    state = gameReducer(state, { type: 'SET_SAVINGS_RATE', value: 0 });
    expect(state.savingsRate).toBe(0.05);
  });

  it('traps the household when subsistence rises', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_INITIAL_CAPITAL', value: 60 });
    state = gameReducer(state, { type: 'SET_SUBSISTENCE', value: 40 });
    expect(state.simulation.escaped).toBe(false);
  });

  it('enters the policy phase with the first challenge', () => {
    const state = gameReducer(createInitialState(), { type: 'START_POLICY' });
    expect(state.phase).toBe('policy');
    expect(state.round).toBe(1);
    expect(state.minimumTransfer).toBe(35);
  });

  it('reveals whether a transfer escapes the current challenge', () => {
    let state = gameReducer(createInitialState(), { type: 'START_POLICY' });
    state = gameReducer(state, { type: 'SET_TRANSFER', value: 40 });
    state = gameReducer(state, { type: 'ESCAPE_NOW' });
    expect(state.escaped).toBe(true);
  });

  it('scores a correct guess within tolerance of the minimum', () => {
    let state = gameReducer(createInitialState(), { type: 'START_POLICY' });
    state = gameReducer(state, { type: 'SET_GUESS', value: 36 });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.answered).toBe(true);
    expect(state.correct).toBe(true);
    expect(state.score).toBe(1);
    expect(state.minimumTransfer).toBe(35);
  });

  it('scores a guess below the minimum as incorrect', () => {
    let state = gameReducer(createInitialState(), { type: 'START_POLICY' });
    state = gameReducer(state, { type: 'SET_GUESS', value: 10 });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.correct).toBe(false);
    expect(state.score).toBe(0);
  });

  it('ignores re-checks after answering', () => {
    let state = gameReducer(createInitialState(), { type: 'START_POLICY' });
    state = gameReducer(state, { type: 'SET_GUESS', value: 36 });
    state = gameReducer(state, { type: 'CHECK' });
    const before = state.score;
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.score).toBe(before);
  });

  it('advances to the next challenge after answering', () => {
    let state = gameReducer(createInitialState(), { type: 'START_POLICY' });
    state = gameReducer(state, { type: 'SET_GUESS', value: 36 });
    state = gameReducer(state, { type: 'CHECK' });
    state = gameReducer(state, { type: 'NEXT_CHALLENGE' });
    expect(state.round).toBe(2);
    expect(state.challenge.id).toBe('mid');
    expect(state.minimumTransfer).toBe(
      minimumTransferFor(
        state.challenge.initialCapital,
        state.challenge.savingsRate,
        state.challenge.subsistence
      )
    );
    expect(state.answered).toBe(false);
  });

  it('resets to the simulate phase', () => {
    let state = gameReducer(createInitialState(), { type: 'START_POLICY' });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('simulate');
    expect(state.round).toBe(1);
    expect(state.score).toBe(0);
  });
});
