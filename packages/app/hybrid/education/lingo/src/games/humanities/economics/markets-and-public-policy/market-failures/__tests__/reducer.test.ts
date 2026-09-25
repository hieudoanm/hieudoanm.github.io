import { SCENARIOS } from '../constants';
import { choseOptimalTax } from '../game';
import { createInitialState, gameReducer, GameState } from '../reducer';

const answerAll = (state: GameState): GameState => {
  let next = state;
  SCENARIOS.forEach((scenario, index) => {
    next = gameReducer(next, {
      type: 'ANSWER_POLICY',
      policy: scenario.bestPolicy,
    });
    next = gameReducer(next, { type: 'NEXT_SCENARIO' });
    if (index === SCENARIOS.length - 1) {
      expect(next.phase).toBe('pollution');
    }
  });
  return next;
};

describe('market failures reducer', () => {
  it('records a correct policy answer and advances the score', () => {
    const state = gameReducer(createInitialState(), {
      type: 'ANSWER_POLICY',
      policy: SCENARIOS[0].bestPolicy,
    });
    expect(state.answers).toHaveLength(1);
    expect(state.lastAnswer?.policyCorrect).toBe(true);
    expect(state.score).toBe(1);
    expect(state.phase).toBe('scenario');
  });

  it('does not count a wrong policy toward the score', () => {
    let state = gameReducer(createInitialState(), {
      type: 'ANSWER_POLICY',
      policy: 'subsidy',
    });
    state = gameReducer(state, {
      type: 'ANSWER_POLICY',
      policy: SCENARIOS[0].bestPolicy,
    });
    expect(state.answers).toHaveLength(1);
    expect(state.score).toBe(0);
  });

  it('ignores duplicate answers for the same scenario', () => {
    let state = gameReducer(createInitialState(), {
      type: 'ANSWER_POLICY',
      policy: SCENARIOS[0].bestPolicy,
    });
    const answersBefore = state.answers.length;
    state = gameReducer(state, {
      type: 'ANSWER_POLICY',
      policy: 'subsidy',
    });
    expect(state.answers).toHaveLength(answersBefore);
    expect(state.score).toBe(1);
  });

  it('moves to the pollution phase after all scenarios are answered', () => {
    const state = answerAll(createInitialState());
    expect(state.phase).toBe('pollution');
    expect(state.answers).toHaveLength(SCENARIOS.length);
  });

  it('sets the gap and tax within the pollution phase', () => {
    let state = answerAll(createInitialState());
    state = gameReducer(state, { type: 'SET_GAP', gap: 35 });
    state = gameReducer(state, { type: 'SET_TAX', tax: 35 });
    expect(state.pollution.gap).toBe(35);
    expect(state.pollution.tax).toBe(35);
  });

  it('finishes on done when the tax is confirmed', () => {
    let state = answerAll(createInitialState());
    state = gameReducer(state, { type: 'CONFIRM_TAX' });
    expect(state.phase).toBe('done');
    expect(state.pollution.confirmed).toBe(true);
  });

  it('scores tax accuracy at the optimal value', () => {
    let state = answerAll(createInitialState());
    state = gameReducer(state, { type: 'SET_TAX', tax: state.pollution.gap });
    state = gameReducer(state, { type: 'CONFIRM_TAX' });
    expect(choseOptimalTax(state.pollution.tax, state.pollution.gap)).toBe(
      true
    );
  });

  it('guards policy answers once the quiz is complete', () => {
    let state = answerAll(createInitialState());
    state = gameReducer(state, { type: 'ANSWER_POLICY', policy: 'subsidy' });
    expect(state.score).toBe(SCENARIOS.length);
  });

  it('ignores tax updates outside the pollution phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_TAX',
      tax: 9,
    });
    expect(state.pollution.tax).toBe(0);
  });

  it('resets to the initial state', () => {
    let state = answerAll(createInitialState());
    state = gameReducer(state, { type: 'CONFIRM_TAX' });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('scenario');
    expect(state.scenarioIndex).toBe(0);
    expect(state.score).toBe(0);
    expect(state.answers).toEqual([]);
  });
});
