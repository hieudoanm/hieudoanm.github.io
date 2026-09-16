import { PRIZE } from '../constants';
import { createInitialState, gameReducer } from '../reducer';
import type { RentResult } from '../types';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    drawWin: () => true,
  };
});

const toRentRound = () => {
  let state = createInitialState();
  state = gameReducer(state, { type: 'CHECK' });
  state = gameReducer(state, { type: 'NEXT' });
  state = gameReducer(state, { type: 'SET_SUPPORTED', optionId: 'B' });
  state = gameReducer(state, { type: 'SET_FIRST_PAIR', pair: ['A', 'C'] });
  state = gameReducer(state, { type: 'CHECK' });
  state = gameReducer(state, { type: 'NEXT' });
  return state;
};

describe('public choice reducer', () => {
  it('starts on the median voter round', () => {
    const state = createInitialState();
    expect(state.phase).toBe('plan');
    expect(state.mode).toBe('median');
    expect(state.round).toBe(1);
    expect(state.median).toBe(50);
    expect(state.playerPlatform).toBe(50);
    expect(state.botPlatform).toBe(70);
    expect(state.voters).toHaveLength(5);
  });

  it('clamps the platform to the policy line', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_PLATFORM',
      value: 150,
    });
    expect(state.playerPlatform).toBe(100);
    state = gameReducer(state, { type: 'SET_PLATFORM', value: -5 });
    expect(state.playerPlatform).toBe(0);
  });

  it('rewards the median platform with the election', () => {
    const state = gameReducer(createInitialState(), { type: 'CHECK' });
    expect(state.phase).toBe('check');
    expect(state.lastResult?.mode).toBe('median');
    expect(state.lastResult?.won).toBe(true);
  });

  it('punishes drifting from the median', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_PLATFORM',
      value: 90,
    });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.lastResult?.won).toBe(false);
  });

  it('requires a supported option and pairing before checking the paradox', () => {
    let state = gameReducer(createInitialState(), { type: 'CHECK' });
    state = gameReducer(state, { type: 'NEXT' });
    expect(state.mode).toBe('paradox');
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.phase).toBe('plan');
    state = gameReducer(state, { type: 'SET_SUPPORTED', optionId: 'A' });
    state = gameReducer(state, { type: 'SET_FIRST_PAIR', pair: ['B', 'C'] });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.phase).toBe('check');
    expect(state.lastResult?.won).toBe(true);
    expect(state.lastResult?.detail).toMatchObject({ finalWinner: 'A' });
  });

  it('clamps rent spending to the prize range', () => {
    let state = toRentRound();
    state = gameReducer(state, { type: 'SET_SPEND', value: PRIZE + 100 });
    expect(state.rentPlayerSpend).toBe(PRIZE);
    state = gameReducer(state, { type: 'SET_SPEND', value: -5 });
    expect(state.rentPlayerSpend).toBe(0);
  });

  it('computes the Tullock payoff and waste', () => {
    let state = toRentRound();
    state = gameReducer(state, { type: 'SET_SPEND', value: 30000 });
    state = gameReducer(state, { type: 'CHECK' });
    const detail = state.lastResult?.detail as RentResult;
    expect(state.phase).toBe('check');
    expect(state.totalWaste).toBe(50000);
    expect(detail.winProbability).toBe(0.6);
    expect(detail.expectedPayoff).toBe(30000);
    expect(detail.netPayoff).toBe(70000);
    expect(state.lastResult?.won).toBe(true);
  });

  it('advances all nine rounds and finishes', () => {
    let state = createInitialState();
    for (let round = 1; round <= 9; round++) {
      if (state.mode === 'median') {
        state = gameReducer(state, { type: 'CHECK' });
      } else if (state.mode === 'paradox') {
        state = gameReducer(state, { type: 'SET_SUPPORTED', optionId: 'A' });
        state = gameReducer(state, {
          type: 'SET_FIRST_PAIR',
          pair: ['B', 'C'],
        });
        state = gameReducer(state, { type: 'CHECK' });
      } else {
        state = gameReducer(state, { type: 'SET_SPEND', value: 30000 });
        state = gameReducer(state, { type: 'CHECK' });
      }
      expect(state.phase).toBe('check');
      state = gameReducer(state, { type: 'NEXT' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(9);
    expect(state.wins).toBe(9);
  });

  it('ignores actions outside their phase or mode', () => {
    const state = createInitialState();
    expect(
      gameReducer(state, { type: 'SET_FIRST_PAIR', pair: ['A', 'B'] }).firstPair
    ).toBeNull();
    expect(
      gameReducer(state, { type: 'SET_SPEND', value: 10 }).rentPlayerSpend
    ).toBe(0);
    expect(gameReducer(state, { type: 'NEXT' }).phase).toBe('plan');
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'CHECK' });
    state = gameReducer(state, { type: 'NEXT' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.round).toBe(1);
    expect(reset.phase).toBe('plan');
    expect(reset.results).toEqual([]);
  });
});
