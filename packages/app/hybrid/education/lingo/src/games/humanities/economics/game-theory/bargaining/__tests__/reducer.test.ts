import { createInitialState, gameReducer, GameState } from '../reducer';

jest.mock('../game', () => ({
  randomThreshold: () => 30,
  offerFor: (keep: number) => 100 - keep,
  resolve: (keep: number, threshold: number) => {
    const accepted = 100 - keep >= threshold;
    return { accepted, payoff: accepted ? keep : 0 };
  },
  formatCurrency: (n: number) => `$${n}`,
}));

describe('bargaining reducer', () => {
  it('starts in the choose phase', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
  });

  it('submits a keep amount and reveals the result', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_KEEP',
      keep: 60,
    });
    expect(state.phase).toBe('reveal');
    expect(state.result?.keep).toBe(60);
    expect(state.result?.offer).toBe(40);
    expect(state.result?.threshold).toBe(30);
    expect(state.result?.accepted).toBe(true);
    expect(state.result?.payoff).toBe(60);
  });

  it('rejects a keep that is too high', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_KEEP',
      keep: 80,
    });
    expect(state.result?.accepted).toBe(false);
    expect(state.result?.payoff).toBe(0);
  });

  it('advances rounds and completes the game', () => {
    let state = createInitialState();
    for (let round = 1; round <= 5; round++) {
      state = gameReducer(state, { type: 'SUBMIT_KEEP', keep: 60 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(5);
    expect(state.totalKept).toBe(300);
    expect(state.acceptedCount).toBe(5);
  });

  it('resets to the initial state', () => {
    const state = gameReducer(createInitialState() as GameState, {
      type: 'RESET',
    });
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
    expect(state.phase).toBe('choose');
  });

  it('ignores NEXT_ROUND when there is no result', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
  });
});
