import { createInitialState, gameReducer } from '../reducer';
import { SCENARIOS, TOTAL_SCENARIOS } from '../constants';

describe('causal reducer', () => {
  it('spends budget and records hints while investigating', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'INVESTIGATE',
      action: 'randomized-trial',
    });
    expect(state.budgetSpent).toBe(1);
    expect(state.hints).toHaveLength(1);
    expect(state.hints[0].action).toBe('randomized-trial');
  });

  it('ignores investigations once the budget is exhausted', () => {
    let state = createInitialState();
    for (let i = 0; i < 5; i++) {
      state = gameReducer(state, {
        type: 'INVESTIGATE',
        action: 'control-confounders',
      });
    }
    expect(state.budgetSpent).toBe(3);
    expect(state.hints).toHaveLength(3);
  });

  it('scores a correct answer plus unused points', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'INVESTIGATE',
      action: 'randomized-trial',
    });
    state = gameReducer(state, {
      type: 'SUBMIT_ANSWER',
      answer: SCENARIOS[0].correct,
    });
    expect(state.phase).toBe('reveal');
    expect(state.results).toHaveLength(1);
    expect(state.results[0].correct).toBe(true);
    expect(state.totalScore).toBe(9);
  });

  it('scores zero for a wrong answer', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_ANSWER', answer: 'causal' });
    expect(state.results[0].correct).toBe(false);
    expect(state.totalScore).toBe(0);
  });

  it('advances through scenarios and completes the game', () => {
    let state = createInitialState();
    for (let i = 0; i < TOTAL_SCENARIOS; i++) {
      state = gameReducer(state, {
        type: 'SUBMIT_ANSWER',
        answer: SCENARIOS[i].correct,
      });
      state = gameReducer(state, { type: 'NEXT_SCENARIO' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_SCENARIOS);
    expect(state.totalScore).toBe(60);
  });

  it('ignores answers outside the investigate phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_ANSWER', answer: 'causal' });
    const before = state;
    const next = gameReducer(state, {
      type: 'SUBMIT_ANSWER',
      answer: 'coincidence',
    });
    expect(next.results).toEqual(before.results);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_ANSWER', answer: 'causal' });
    state = gameReducer(state, { type: 'NEXT_SCENARIO' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.phase).toBe('investigate');
    expect(reset.round).toBe(1);
    expect(reset.results).toEqual([]);
  });
});
