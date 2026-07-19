import { TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer, GameState } from '../reducer';

describe('business cycles reducer', () => {
  it('starts on the first forecast at round 2', () => {
    const state = createInitialState();
    expect(state.phase).toBe('predict');
    expect(state.round).toBe(2);
    expect(state.results).toEqual([]);
    expect(state.totalScore).toBe(0);
  });

  it('reveals a scored result after a numeric prediction', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_PREDICTION',
      prediction: 3.0,
      category: null,
    });
    expect(state.phase).toBe('reveal');
    expect(state.results).toHaveLength(1);
    expect(state.results[0].actual).toBe(3.1);
    expect(state.results[0].predicted).toBe(3.0);
    expect(state.results[0].phase).toBe('expansion');
    expect(state.results[0].score).toBe(4.8);
  });

  it('reveals an unscored result for a category-only call', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_PREDICTION',
      prediction: null,
      category: 'recession',
    });
    expect(state.phase).toBe('reveal');
    expect(state.results[0].predicted).toBeNull();
    expect(state.results[0].category).toBe('recession');
    expect(state.results[0].score).toBe(0);
  });

  it('advances to the next predict round after reveal', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_PREDICTION',
      prediction: 3.0,
      category: null,
    });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('predict');
    expect(state.round).toBe(3);
    expect(state.totalScore).toBe(4.8);
  });

  it('completes the game after the final round', () => {
    let state = createInitialState();
    for (let round = 0; round < TOTAL_ROUNDS - 1; round++) {
      state = gameReducer(state, {
        type: 'SUBMIT_PREDICTION',
        prediction: null,
        category: 'expansion',
      });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_ROUNDS - 1);
  });

  it('ignores a submission outside the predict phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_PREDICTION',
      prediction: 3.0,
      category: null,
    });
    const before = state;
    const next = gameReducer(state, {
      type: 'SUBMIT_PREDICTION',
      prediction: 1.0,
      category: null,
    });
    expect(next.results).toHaveLength(before.results.length);
  });

  it('ignores advancing outside the reveal phase', () => {
    const before = createInitialState();
    const next = gameReducer(before, { type: 'NEXT_ROUND' });
    expect(next.round).toBe(before.round);
    expect(next.phase).toBe('predict');
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_PREDICTION',
      prediction: 3.0,
      category: null,
    });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    const reset = gameReducer(state as GameState, { type: 'RESET' });
    expect(reset.round).toBe(2);
    expect(reset.phase).toBe('predict');
    expect(reset.results).toEqual([]);
    expect(reset.totalScore).toBe(0);
  });
});
