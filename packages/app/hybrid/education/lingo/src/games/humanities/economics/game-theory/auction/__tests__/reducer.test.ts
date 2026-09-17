import { createInitialState, gameReducer, GameState } from '../reducer';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    sampleTrueValue: () => 100,
    sampleEstimate: (v: number) => v - 10,
    planBids: () => [
      { botId: 'owl', estimate: 95, bid: 95 },
      { botId: 'fox', estimate: 80, bid: 70 },
      { botId: 'mouse', estimate: 70, bid: 53 },
    ],
  };
});

describe('auction reducer', () => {
  it('starts a round with a format and private estimates', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      format: 'vickrey',
    });
    expect(state.phase).toBe('choose');
    expect(state.format).toBe('vickrey');
    expect(state.playerEstimate).toBe(90);
    expect(state.bids).toHaveLength(3);
  });

  it('resolves an auction and reveals the player payoff', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      format: 'vickrey',
    });
    state = gameReducer(state, { type: 'SUBMIT_BID', amount: 60 });
    expect(state.phase).toBe('reveal');
    expect(state.result?.winner).toBe('owl');
    expect(state.result?.price).toBe(70);
    expect(state.result?.playerPayoff).toBe(0);
  });

  it('awards the player value minus price when they win', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      format: 'vickrey',
    });
    state = gameReducer(state, { type: 'SUBMIT_BID', amount: 110 });
    expect(state.result?.winner).toBe('player');
    expect(state.result?.price).toBe(95);
    expect(state.result?.playerPayoff).toBe(5);
  });

  it('advances rounds and completes the game', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = gameReducer(state, { type: 'START_ROUND', format: 'english' });
      state = gameReducer(state, { type: 'SUBMIT_BID', amount: 120 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(5);
    expect(state.totalProfit).toBe(-100);
  });

  it('ignores submissions outside the choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      format: 'english',
    });
    state = gameReducer(state, { type: 'SUBMIT_BID', amount: 100 });
    const before = state;
    const next = gameReducer(state, { type: 'SUBMIT_BID', amount: 10 });
    expect(next.result).toBe(before.result);
  });

  it('resets to the initial state', () => {
    const state = gameReducer(createInitialState() as GameState, {
      type: 'RESET',
    });
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
    expect(state.phase).toBe('choose');
  });
});
