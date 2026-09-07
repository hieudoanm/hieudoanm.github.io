import { createInitialState, gameReducer, GameState } from '../reducer';

describe('framing reducer', () => {
  it('starts with the gains scenario', () => {
    const state = createInitialState();
    expect(state.phase).toBe('question');
    expect(state.current).toBe('A');
    expect(state.gainChoice).toBeNull();
    expect(state.lossChoice).toBeNull();
  });

  it('moves from scenario A to B after a choice', () => {
    const state = gameReducer(createInitialState(), {
      type: 'CHOOSE',
      scenario: 'A',
      choice: 'X',
    });
    expect(state.current).toBe('B');
    expect(state.gainChoice).toBe('X');
    expect(state.lossChoice).toBeNull();
  });

  it('records the loss choice in scenario B and moves to reveal', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'A', choice: 'X' });
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'B', choice: 'Y' });
    expect(state.current).toBe('A');
    expect(state.gainChoice).toBe('X');
    expect(state.lossChoice).toBe('Y');
    expect(state.phase).toBe('reveal');
  });

  it('reveals a framing score of 1 for the classic pattern', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'A', choice: 'X' });
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'B', choice: 'Y' });
    state = gameReducer(state, { type: 'REVEAL' });
    expect(state.phase).toBe('done');
    expect(state.framingScore).toBe(1);
  });

  it('reveals a framing score of 0 for any other pattern', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'A', choice: 'X' });
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'B', choice: 'X' });
    state = gameReducer(state, { type: 'REVEAL' });
    expect(state.phase).toBe('done');
    expect(state.framingScore).toBe(0);
  });

  it('ignores a reveal before both choices are recorded', () => {
    const state = gameReducer(createInitialState(), { type: 'REVEAL' });
    expect(state.phase).toBe('question');
    expect(state.framingScore).toBe(0);
  });

  it('recalculates the score when revealing after a complete answer', () => {
    let state = gameReducer(createInitialState(), {
      type: 'CHOOSE',
      scenario: 'A',
      choice: 'X',
    });
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'B', choice: 'Y' });
    expect(state.phase).toBe('reveal');
    expect(state.framingScore).toBe(0);
    state = gameReducer(state, { type: 'REVEAL' });
    expect(state.phase).toBe('done');
    expect(state.framingScore).toBe(1);
  });

  it('ignores choices outside the question phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'A', choice: 'X' });
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'B', choice: 'Y' });
    state = gameReducer(state, { type: 'REVEAL' });
    const next = gameReducer(state, {
      type: 'CHOOSE',
      scenario: 'A',
      choice: 'Y',
    });
    expect(next.gainChoice).toBe('X');
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'A', choice: 'X' });
    state = gameReducer(state, { type: 'CHOOSE', scenario: 'B', choice: 'Y' });
    state = gameReducer(state, { type: 'REVEAL' });
    const state0 = gameReducer(state as GameState, { type: 'RESET' });
    expect(state0).toEqual(createInitialState());
  });
});
