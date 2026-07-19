import { buildRanking, createInitialState, gameReducer } from '../reducer';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    cooperateContribution: () => 100,
    freeRiderContribution: () => 0,
    conditionalContribution: () => 50,
    payoff: () => 50,
  };
});

const playFullGame = (amount: number) => {
  let state = createInitialState();
  for (let round = 1; round <= 5; round++) {
    state = gameReducer(state, { type: 'SUBMIT_CONTRIBUTION', amount });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
  }
  return state;
};

describe('public-goods reducer', () => {
  it('records a contribution and reveals payoffs', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_CONTRIBUTION', amount: 40 });
    expect(state.phase).toBe('reveal');
    expect(state.result?.myContribution).toBe(40);
    expect(state.result?.contributions.hana).toBe(100);
    expect(state.result?.contributions.marco).toBe(0);
    expect(state.result?.contributions.bea).toBe(50);
    expect(state.result?.myPayoff).toBe(50);
  });

  it('ignores submissions outside the choose phase', () => {
    const state = createInitialState();
    const reveal = gameReducer(state, {
      type: 'SUBMIT_CONTRIBUTION',
      amount: 40,
    });
    const again = gameReducer(reveal, {
      type: 'SUBMIT_CONTRIBUTION',
      amount: 10,
    });
    expect(again.result).toBe(reveal.result);
  });

  it('accumulates history and total across rounds', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_CONTRIBUTION', amount: 100 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.round).toBe(2);
    expect(state.history).toHaveLength(1);
    expect(state.myTotal).toBe(50);
    expect(state.playerHistory).toEqual([100]);
  });

  it('completes the game after five rounds', () => {
    const state = playFullGame(80);
    expect(state.phase).toBe('done');
    expect(state.history).toHaveLength(5);
    expect(state.myTotal).toBe(250);
  });

  it('resets to the initial state', () => {
    const state = playFullGame(80);
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.round).toBe(1);
    expect(reset.history).toEqual([]);
    expect(reset.myTotal).toBe(0);
    expect(reset.phase).toBe('choose');
  });
});

describe('buildRanking', () => {
  it('sorts players by descending total', () => {
    const ranking = buildRanking([], 100);
    expect(ranking[0].id).toBe('you');
    expect(ranking).toHaveLength(4);
  });
});
