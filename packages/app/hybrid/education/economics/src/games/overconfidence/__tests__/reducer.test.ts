import { createInitialState, gameReducer, GameState } from '../reducer';

describe('overconfidence reducer', () => {
  it('starts on the first question in an idle state', () => {
    const state = createInitialState();
    expect(state.phase).toBe('question');
    expect(state.index).toBe(0);
    expect(state.answers).toEqual([]);
  });

  it('selects an option and confidence on the question phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SELECT_OPTION', option: 'B' });
    state = gameReducer(state, { type: 'SELECT_CONFIDENCE', value: 90 });
    expect(state.selected).toBe('B');
    expect(state.confidence).toBe(90);
  });

  it('submits an answer and reveals correctness using the known answer', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SELECT_OPTION', option: 'A' });
    state = gameReducer(state, { type: 'SELECT_CONFIDENCE', value: 70 });
    state = gameReducer(state, { type: 'SUBMIT_ANSWER' });
    expect(state.phase).toBe('reveal');
    expect(state.answers).toHaveLength(1);
    expect(state.answers[0].correct).toBe(true);
  });

  it('records a wrong answer for an incorrect guess', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SELECT_OPTION', option: 'B' });
    state = gameReducer(state, { type: 'SELECT_CONFIDENCE', value: 70 });
    state = gameReducer(state, { type: 'SUBMIT_ANSWER' });
    expect(state.answers[0].correct).toBe(false);
  });

  it('ignores a submission without a selected option or confidence', () => {
    const before = createInitialState();
    let state = gameReducer(before, { type: 'SUBMIT_ANSWER' });
    expect(state.answers).toHaveLength(0);
    expect(state.phase).toBe('question');
    state = gameReducer(
      { ...before, selected: 'A' },
      { type: 'SUBMIT_ANSWER' }
    );
    expect(state.answers).toHaveLength(0);
  });

  it('advances through all questions into the aggregate phase', () => {
    let state = createInitialState();
    for (let i = 0; i < 10; i++) {
      state = gameReducer(state, { type: 'SELECT_OPTION', option: 'A' });
      state = gameReducer(state, { type: 'SELECT_CONFIDENCE', value: 80 });
      state = gameReducer(state, { type: 'SUBMIT_ANSWER' });
      state = gameReducer(state, { type: 'NEXT_QUESTION' });
    }
    expect(state.answers).toHaveLength(10);
    expect(state.phase).toBe('aggregate');
    expect(state.buckets).toHaveLength(6);
  });

  it('moves to the market with a derived hit rate', () => {
    let state = createInitialState();
    for (let i = 0; i < 10; i++) {
      state = gameReducer(state, { type: 'SELECT_OPTION', option: 'A' });
      state = gameReducer(state, { type: 'SELECT_CONFIDENCE', value: 80 });
      state = gameReducer(state, { type: 'SUBMIT_ANSWER' });
      state = gameReducer(state, { type: 'NEXT_QUESTION' });
    }
    state = gameReducer(state, { type: 'AGGREGATE_NEXT' });
    expect(state.phase).toBe('market');
    expect(state.marketActual).toBe(90);
  });

  it('resolves the market with a position outcome', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_POSITION',
      value: 80,
    });
    state = gameReducer(
      { ...state, phase: 'market', marketActual: 70 },
      { type: 'SUBMIT_MARKET' }
    );
    expect(state.phase).toBe('market-result');
    expect(state.marketOutcome?.actual).toBe(70);
  });

  it('moves through slider to done and resets', () => {
    const initial = createInitialState();
    const untouched = gameReducer(initial, { type: 'MARKET_NEXT' });
    expect(untouched).toBe(initial);
    let state = gameReducer(
      { ...createInitialState(), phase: 'slider' },
      { type: 'SET_BRACKET', low: 5000, high: 8000 }
    );
    state = gameReducer(state, { type: 'SUBMIT_SLIDER' });
    expect(state.phase).toBe('slider-result');
    expect(state.nileInRange).toBe(true);
    state = gameReducer(state, { type: 'SLIDER_NEXT' });
    expect(state.phase).toBe('done');
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.phase).toBe('question');
    expect(reset.answers).toEqual([]);
  });

  it('rejects bracket submissions that exceed the market phase guard', () => {
    const before = createInitialState();
    const after = gameReducer(before, { type: 'SUBMIT_SLIDER' });
    expect(after).toEqual(before);
  });
});
