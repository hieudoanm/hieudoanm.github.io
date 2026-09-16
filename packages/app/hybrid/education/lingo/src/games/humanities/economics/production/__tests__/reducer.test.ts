import { GameState, createInitialState, gameReducer } from '../reducer';

describe('production reducer', () => {
  it('starts in the lab phase with defaults', () => {
    const state = createInitialState();
    expect(state.phase).toBe('lab');
    expect(state.labor).toBe(8);
    expect(state.wage).toBe(10);
    expect(state.fixedCost).toBe(100);
    expect(state.price).toBe(20);
    expect(state.score).toBe(0);
  });

  it('updates the sliders and clears the check feedback', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_LABOR', value: 12 });
    state = gameReducer(state, { type: 'SET_WAGE', value: 15 });
    state = gameReducer(state, { type: 'SET_FIXED_COST', value: 250 });
    state = gameReducer(state, { type: 'SET_PRICE', value: 6 });
    state = gameReducer(state, { type: 'SET_TARGET_Q', value: '40' });
    expect(state.labor).toBe(12);
    expect(state.wage).toBe(15);
    expect(state.fixedCost).toBe(250);
    expect(state.price).toBe(6);
    expect(state.targetQ).toBe('40');
  });

  it('marks a correct profit-max guess', () => {
    let state: GameState = createInitialState();
    state = gameReducer(state, { type: 'SET_PRICE', value: 4 });
    state = gameReducer(state, { type: 'SET_TARGET_Q', value: '37' });
    state = gameReducer(state, { type: 'CHECK_PROFIT' });
    expect(state.checkResult).toBe('correct');
  });

  it('marks a wrong profit-max guess', () => {
    let state: GameState = createInitialState();
    state = gameReducer(state, { type: 'SET_TARGET_Q', value: '50' });
    state = gameReducer(state, { type: 'CHECK_PROFIT' });
    expect(state.checkResult).toBe('wrong');
  });

  it('ignores check when the target is empty', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHECK_PROFIT' });
    expect(state.checkResult).toBe('idle');
  });

  it('starts a quiz and resets score', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHECK_ANSWER', selected: 1 });
    state = gameReducer(state, { type: 'START_QUIZ' });
    expect(state.phase).toBe('quiz');
    expect(state.quizIndex).toBe(0);
    expect(state.score).toBe(0);
  });

  it('scores a correct answer once', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    state = gameReducer(state, { type: 'CHECK_ANSWER', selected: 1 });
    expect(state.selected).toBe(1);
    expect(state.score).toBe(1);
    const before = state.score;
    state = gameReducer(state, { type: 'CHECK_ANSWER', selected: 0 });
    expect(state.score).toBe(before);
  });

  it('advances through all five questions', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    for (let round = 0; round < 5; round++) {
      state = gameReducer(state, { type: 'CHECK_ANSWER', selected: 1 });
      state = gameReducer(state, { type: 'NEXT_QUIZ' });
    }
    expect(state.phase).toBe('done');
    expect(state.quizResults).toHaveLength(5);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_QUIZ' });
    const next = gameReducer(state, { type: 'RESET' });
    expect(next).toEqual(createInitialState());
  });
});
