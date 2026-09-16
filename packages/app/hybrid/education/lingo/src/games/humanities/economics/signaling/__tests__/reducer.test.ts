import { createInitialState, gameReducer, GameState } from '../reducer';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    scheduleCandidates: () => [
      'high',
      'high',
      'high',
      'high',
      'low',
      'low',
      'low',
      'low',
    ],
  };
});

describe('signaling reducer', () => {
  it('starts in the choose phase with no candidates', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.w0).toBe(0);
    expect(state.candidates).toEqual([]);
  });

  it('reveals candidates after committing wages', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_WAGES',
      w0: 50,
      w1: 75,
    });
    expect(state.phase).toBe('reveal');
    expect(state.w0).toBe(50);
    expect(state.w1).toBe(75);
    expect(state.candidates).toHaveLength(8);
    expect(state.candidates[0].type).toBe('high');
    expect(state.candidates[4].type).toBe('low');
    expect(state.totalProfit).toBe(140);
  });

  it('pools low candidates when the premium is too high', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_WAGES',
      w0: 50,
      w1: 85,
    });
    expect(state.candidates[4].education).toBe(1);
    expect(state.totalProfit).toBe(-40);
  });

  it('ignores submissions outside the choose phase', () => {
    const first = gameReducer(createInitialState(), {
      type: 'SUBMIT_WAGES',
      w0: 50,
      w1: 75,
    });
    const second = gameReducer(first, { type: 'SUBMIT_WAGES', w0: 10, w1: 10 });
    expect(second.candidates).toBe(first.candidates);
  });

  it('moves to done after revealing results', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_WAGES',
      w0: 50,
      w1: 75,
    });
    state = gameReducer(state, { type: 'REVEAL_RESULTS' });
    expect(state.phase).toBe('done');
  });

  it('ignores REVEAL_RESULTS outside the reveal phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'REVEAL_RESULTS',
    });
    expect(state.phase).toBe('choose');
  });

  it('resets to the initial state', () => {
    const state = gameReducer(createInitialState() as GameState, {
      type: 'RESET',
    });
    expect(state.phase).toBe('choose');
    expect(state.candidates).toEqual([]);
    expect(state.totalProfit).toBe(0);
  });
});
