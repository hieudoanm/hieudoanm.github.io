import { createInitialState, gameReducer, GameState } from '../reducer';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    generateQuizParams: () => ({ w0: 30000, w1: 46000, m: 5000, p: 0.8 }),
  };
});

describe('migration reducer', () => {
  it('creates the initial state in the input phase', () => {
    const state = createInitialState();
    expect(state.phase).toBe('input');
    expect(state.originWage).toBe(30000);
    expect(state.destWage).toBe(55000);
    expect(state.movingCost).toBe(5000);
    expect(state.jobProb).toBe(0.85);
  });

  it('updates sliders and recomputes nothing', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_ORIGIN_WAGE', value: 40000 });
    state = gameReducer(state, { type: 'SET_DEST_WAGE', value: 70000 });
    state = gameReducer(state, { type: 'SET_MOVING_COST', value: 10000 });
    state = gameReducer(state, { type: 'SET_JOB_PROB', value: 0.9 });
    expect(state.originWage).toBe(40000);
    expect(state.destWage).toBe(70000);
    expect(state.movingCost).toBe(10000);
    expect(state.jobProb).toBe(0.9);
  });

  it('computes a decision in the result phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'COMPUTE_DECISION' });
    expect(state.phase).toBe('result');
    expect(state.decision).not.toBeNull();
    expect(state.decision?.shouldMove).toBe(state.decision!.npv > 0);
  });

  it('runs the macro simulation into the result phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SIMULATE_MACRO' });
    expect(state.phase).toBe('result');
    expect(state.macro).not.toBeNull();
    expect(state.macro?.migrantCount).toBe(10);
  });

  it('starts a quiz with generated parameters', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    expect(state.phase).toBe('quiz');
    expect(state.quizParams).toEqual({ w0: 30000, w1: 46000, m: 5000, p: 0.8 });
    expect(state.quizAnswer).toBeNull();
  });

  it('scores a quiz answer', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    state = gameReducer(state, { type: 'ANSWER_QUIZ', answer: 'move' });
    expect(state.quizRounds).toHaveLength(1);
    expect(state.quizRounds[0].correct).toBe(
      state.quizRound === 1 && state.quizRounds[0].npv > 0
    );
  });

  it('ignores a second answer in the same round', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    state = gameReducer(state, { type: 'ANSWER_QUIZ', answer: 'stay' });
    const before = state;
    const next = gameReducer(state, { type: 'ANSWER_QUIZ', answer: 'move' });
    expect(next.quizRounds).toHaveLength(1);
    expect(next.quizRounds).toBe(before.quizRounds);
  });

  it('advances quiz rounds and finishes after the last round', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    for (let round = 1; round <= 5; round++) {
      state = gameReducer(state, { type: 'ANSWER_QUIZ', answer: 'move' });
      state = gameReducer(state, { type: 'NEXT_QUIZ' });
    }
    expect(state.phase).toBe('done');
    expect(state.quizRounds).toHaveLength(5);
  });

  it('does not advance before answering', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    const next = gameReducer(state, { type: 'NEXT_QUIZ' });
    expect(next.quizRound).toBe(1);
    expect(next.quizAnswer).toBeNull();
  });

  it('resets to the initial state', () => {
    const state = gameReducer(createInitialState() as GameState, {
      type: 'RESET',
    });
    expect(state.phase).toBe('input');
    expect(state.quizRounds).toEqual([]);
  });
});
