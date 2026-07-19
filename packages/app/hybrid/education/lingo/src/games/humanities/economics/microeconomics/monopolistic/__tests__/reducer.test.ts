import { createInitialState, gameReducer, GameState } from '../reducer';

describe('monopolistic competition reducer', () => {
  it('initializes the lab with a differentiated firm', () => {
    const state = createInitialState();
    expect(state.phase).toBe('lab');
    expect(state.mode).toBe('monopolistic');
    expect(state.differentiation).toBe(50);
    expect(state.quantity).toBe(51);
    expect(state.entryProgress).toBe(0);
    expect(state.labBestProfit).toBe(1751);
  });

  it('switches mode and resets the entry simulation', () => {
    let state: GameState = gameReducer(createInitialState(), {
      type: 'SIMULATE_ENTRY',
    });
    state = gameReducer(state, { type: 'SIMULATE_ENTRY' });
    expect(state.entryProgress).toBe(0.4);
    state = gameReducer(state, { type: 'SET_MODE', mode: 'monopoly' });
    expect(state.mode).toBe('monopoly');
    expect(state.entryProgress).toBe(0);
  });

  it('clamps differentiation and records the new best profit', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_DIFFERENTIATION',
      value: 200,
    });
    expect(state.differentiation).toBe(100);
    expect(state.labBestProfit).toBe(3011);
  });

  it('clamps quantity to the allowed range', () => {
    let state: GameState = gameReducer(createInitialState(), {
      type: 'SET_QUANTITY',
      quantity: -5,
    });
    expect(state.quantity).toBe(0);
    state = gameReducer(state, { type: 'SET_QUANTITY', quantity: 500 });
    expect(state.quantity).toBe(100);
  });

  it('derives quantity from a chosen price on the demand line', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_PRICE',
      price: 60,
    });
    expect(state.quantity).toBe(29);
  });

  it('ignores price setting for a price-taking firm', () => {
    let state: GameState = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'perfect',
    });
    state = gameReducer(state, { type: 'SET_PRICE', price: 60 });
    expect(state.quantity).toBe(51);
  });

  it('only simulates entry for an erodible market structure', () => {
    let state: GameState = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'monopoly',
    });
    state = gameReducer(state, { type: 'SIMULATE_ENTRY' });
    expect(state.entryProgress).toBe(0);
  });

  it('ignores lab controls once the quiz has started', () => {
    let state: GameState = gameReducer(createInitialState(), {
      type: 'START_QUIZ',
    });
    state = gameReducer(state, { type: 'SET_QUANTITY', quantity: 10 });
    expect(state.quantity).toBe(51);
  });

  it('grading one quiz round records a correct answer', () => {
    let state: GameState = gameReducer(createInitialState(), {
      type: 'START_QUIZ',
    });
    expect(state.phase).toBe('quiz');
    state = gameReducer(state, { type: 'SELECT_QUIZ_OPTION', q: 52 });
    state = gameReducer(state, { type: 'CHECK_QUIZ' });
    expect(state.quizAnswered).toBe(true);
    expect(state.quizScore).toBe(1);
    expect(state.quizResults[0]).toEqual({
      round: 1,
      chosen: 52,
      correct: 52,
      correctChoice: true,
      profitAtChoice: 1252,
      profitAtCorrect: 1252,
    });
  });

  it('ignores checking before an option is selected', () => {
    let state: GameState = gameReducer(createInitialState(), {
      type: 'START_QUIZ',
    });
    const before = state;
    state = gameReducer(state, { type: 'CHECK_QUIZ' });
    expect(state.quizAnswered).toBe(before.quizAnswered);
    expect(state.quizResults).toEqual([]);
  });

  it('completes all quiz rounds and tallies the score', () => {
    const playRound = (state: GameState, q: number): GameState =>
      gameReducer(
        gameReducer(gameReducer(state, { type: 'SELECT_QUIZ_OPTION', q }), {
          type: 'CHECK_QUIZ',
        }),
        { type: 'NEXT_QUIZ' }
      );
    let state: GameState = gameReducer(createInitialState(), {
      type: 'START_QUIZ',
    });
    state = playRound(state, 52);
    state = playRound(state, 70);
    state = playRound(state, 26);
    expect(state.phase).toBe('done');
    expect(state.quizResults).toHaveLength(3);
    expect(state.quizScore).toBe(2);
    expect(state.quizResults.map((r) => r.correct)).toEqual([52, 36, 26]);
  });

  it('resets to the initial lab state', () => {
    const state = gameReducer(createInitialState(), { type: 'RESET' });
    expect(state.phase).toBe('lab');
    expect(state.quizResults).toEqual([]);
    expect(state.quizScore).toBe(0);
  });
});
