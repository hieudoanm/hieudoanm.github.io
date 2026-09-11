import { createInitialState, gameReducer, GameState } from '../reducer';

const toCobb = (state: GameState): GameState =>
  gameReducer(state, { type: 'SELECT_PRESET', goodType: 'cobb-douglas' });

describe('consumer reducer', () => {
  it('creates a state with a starting bundle on the budget line', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.income).toBe(100);
    expect(state.px).toBe(2);
    expect(state.py).toBe(4);
    expect(state.qy).toBe((100 - 2 * state.qx) / 4);
  });

  it('selects a preset utility function', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SELECT_PRESET',
      goodType: 'perfect-substitutes',
    });
    expect(state.goodType).toBe('perfect-substitutes');
  });

  it('keeps qy on the budget line when income changes', () => {
    let state = toCobb(createInitialState());
    state = gameReducer(state, { type: 'SET_INCOME', value: 200 });
    expect(state.qy).toBe((200 - state.px * state.qx) / state.py);
  });

  it('keeps qy on the budget line when price changes', () => {
    let state = toCobb(createInitialState());
    state = gameReducer(state, { type: 'SET_PX', value: 5 });
    expect(state.qy).toBe((state.income - 5 * state.qx) / state.py);
  });

  it('updates qx and recomputes qy', () => {
    let state = toCobb(createInitialState());
    state = gameReducer(state, { type: 'SET_QX', value: 20 });
    expect(state.qx).toBe(20);
    expect(state.qy).toBe((100 - 2 * 20) / 4);
  });

  it('judges an optimal bundle successfully', () => {
    let state = toCobb(createInitialState());
    state = gameReducer(state, { type: 'SET_QX', value: 25 });
    state = gameReducer(state, { type: 'OPTIMIZE' });
    expect(state.phase).toBe('reveal');
    expect(state.result?.score).toBe(100);
    expect(state.result?.choiceX).toBe(25);
    expect(state.result?.choiceUtility).toBeCloseTo(state.result!.optUtility);
    expect(state.attempts).toHaveLength(1);
  });

  it('records a lowish score for a poor bundle', () => {
    let state = toCobb(createInitialState());
    state = gameReducer(state, { type: 'SET_QX', value: 0 });
    state = gameReducer(state, { type: 'OPTIMIZE' });
    expect(state.result?.score).toBeLessThan(100);
  });

  it('ignores optimize outside the choose phase', () => {
    let state = toCobb(createInitialState());
    state = gameReducer(state, { type: 'OPTIMIZE' });
    const before = state.result;
    const next = gameReducer(state, { type: 'OPTIMIZE' });
    expect(next.phase).toBe('reveal');
    expect(next.attempts).toHaveLength(1);
    expect(next.result).toBe(before);
  });

  it('moves back to choose on try again', () => {
    let state = toCobb(createInitialState());
    state = gameReducer(state, { type: 'OPTIMIZE' });
    state = gameReducer(state, { type: 'TRY_AGAIN' });
    expect(state.phase).toBe('choose');
    expect(state.result).toBeNull();
    expect(state.attempts).toHaveLength(1);
  });

  it('resets to the initial state', () => {
    let state = toCobb(createInitialState());
    state = gameReducer(state, { type: 'OPTIMIZE' });
    const next = gameReducer(state, { type: 'RESET' });
    expect(next.phase).toBe('choose');
    expect(next.attempts).toEqual([]);
    expect(next.income).toBe(100);
  });
});
