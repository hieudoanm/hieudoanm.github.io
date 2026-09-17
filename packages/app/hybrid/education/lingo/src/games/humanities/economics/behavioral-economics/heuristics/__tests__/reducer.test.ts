import { ROUNDS, TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer, GameState } from '../reducer';

const reach = (roundsPlayed: number): GameState => {
  let state = createInitialState();
  for (let i = 0; i < roundsPlayed; i++) {
    if (ROUNDS[i].kind === 'representativeness') {
      state = gameReducer(state, { type: 'SUBMIT_GUESS', guess: 40 });
      state = gameReducer(state, { type: 'SUBMIT_GUESS', guess: 30 });
    } else {
      state = gameReducer(state, {
        type: 'SUBMIT_GUESS',
        guess: ROUNDS[i].trueAnswer,
      });
    }
    state = gameReducer(state, { type: 'NEXT' });
  }
  return state;
};

describe('heuristics reducer', () => {
  it('creates an initial state on the first round', () => {
    const state = createInitialState();
    expect(state.phase).toBe('answer');
    expect(state.roundIndex).toBe(0);
    expect(state.totalPoints).toBe(0);
    expect(state.results).toEqual([]);
  });

  it('scores a normal round and reveals feedback', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_GUESS',
      guess: 54,
    });
    expect(state.phase).toBe('reveal');
    expect(state.result?.points).toBe(2);
    expect(state.result?.error).toBe(0);
    expect(state.totalPoints).toBe(2);
  });

  it('awards no points for a far-off guess', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_GUESS',
      guess: 200,
    });
    expect(state.result?.points).toBe(0);
    expect(state.totalPoints).toBe(0);
  });

  it('moves to the next round and commits the result', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_GUESS',
      guess: 54,
    });
    state = gameReducer(state, { type: 'NEXT' });
    expect(state.phase).toBe('answer');
    expect(state.roundIndex).toBe(1);
    expect(state.result).toBeNull();
    expect(state.results).toHaveLength(1);
  });

  it('keeps the answer phase between the two conjunction guesses', () => {
    let state = reach(4);
    state = gameReducer(state, { type: 'SUBMIT_GUESS', guess: 40 });
    expect(state.phase).toBe('answer');
    expect(state.guessA).toBe(40);
    expect(state.result).toBeNull();
  });

  it('penalises a conjunction guess that exceeds the base rate', () => {
    let state = reach(4);
    state = gameReducer(state, { type: 'SUBMIT_GUESS', guess: 40 });
    state = gameReducer(state, { type: 'SUBMIT_GUESS', guess: 50 });
    expect(state.phase).toBe('reveal');
    expect(state.result?.conjunction?.adhered).toBe(false);
    expect(state.result?.points).toBe(0);
  });

  it('rewards a conjunction guess kept under the base rate', () => {
    let state = reach(4);
    state = gameReducer(state, { type: 'SUBMIT_GUESS', guess: 40 });
    state = gameReducer(state, { type: 'SUBMIT_GUESS', guess: 30 });
    expect(state.result?.conjunction?.adhered).toBe(true);
    expect(state.result?.points).toBe(2);
  });

  it('completes the game after all rounds', () => {
    let state = reach(TOTAL_ROUNDS);
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_ROUNDS);
    expect(state.totalPoints).toBe(12);
    expect(state.results.every((r) => r.points === 2)).toBe(true);
  });

  it('ignores guesses outside the answer phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_GUESS',
      guess: 54,
    });
    const before = state;
    const next = gameReducer(state, { type: 'SUBMIT_GUESS', guess: 10 });
    expect(next.result).toBe(before.result);
    expect(next.totalPoints).toBe(before.totalPoints);
  });

  it('ignores NEXT without a completed round', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT' });
    expect(state.roundIndex).toBe(0);
    expect(state.results).toEqual([]);
  });

  it('resets to the initial state', () => {
    let state = reach(3);
    state = gameReducer(state as GameState, { type: 'RESET' });
    expect(state.phase).toBe('answer');
    expect(state.roundIndex).toBe(0);
    expect(state.results).toEqual([]);
    expect(state.totalPoints).toBe(0);
  });
});
