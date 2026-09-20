import { createInitialState, gameReducer } from '../reducer';

describe('lemons reducer', () => {
  it('starts in the playing phase with no trials', () => {
    const state = createInitialState();
    expect(state.phase).toBe('playing');
    expect(state.trials).toEqual([]);
    expect(state.best).toBeNull();
  });

  it('records a lemon-only trial and its best result', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_PRICE',
      price: 5000,
    });
    expect(state.trials).toHaveLength(1);
    expect(state.trials[0]).toMatchObject({
      id: 1,
      price: 5000,
      goodsOffered: 0,
      lemonsOffered: 16,
      expectedValue: 6000,
      expectedProfit: 1000,
      verdict: 'only-lemons',
    });
    expect(state.best?.price).toBe(5000);
  });

  it('tracks the best trial across submissions', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 8000 });
    state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 5000 });
    expect(state.best?.price).toBe(5000);
  });

  it('ignores submissions after ten trials', () => {
    let state = createInitialState();
    for (let i = 0; i < 10; i++) {
      state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 4000 });
    }
    const before = state;
    const next = gameReducer(state, { type: 'SUBMIT_PRICE', price: 5000 });
    expect(next.trials).toHaveLength(10);
    expect(next).toStrictEqual(before);
  });

  it('does not let the player finish before four trials', () => {
    let state = createInitialState();
    for (let i = 0; i < 3; i++) {
      state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 6000 });
    }
    const next = gameReducer(state, { type: 'FINISH' });
    expect(next.phase).toBe('playing');
  });

  it('finishes after four trials', () => {
    let state = createInitialState();
    for (let i = 0; i < 4; i++) {
      state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 6000 });
    }
    const next = gameReducer(state, { type: 'FINISH' });
    expect(next.phase).toBe('done');
  });

  it('ignores requests after the game is finished', () => {
    let state = createInitialState();
    for (let i = 0; i < 4; i++) {
      state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 6000 });
    }
    state = gameReducer(state, { type: 'FINISH' });
    const before = state;
    expect(gameReducer(state, { type: 'SUBMIT_PRICE', price: 4000 })).toBe(
      before
    );
    expect(gameReducer(state, { type: 'FINISH' })).toBe(before);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    for (let i = 0; i < 4; i++) {
      state = gameReducer(state, { type: 'SUBMIT_PRICE', price: 6000 });
    }
    state = gameReducer(state, { type: 'FINISH' });
    const next = gameReducer(state, { type: 'RESET' });
    expect(next).toStrictEqual(createInitialState());
  });
});
