import { createInitialState, gameReducer } from '../reducer';

const TOTAL_ROUNDS = 10;

describe('commons reducer', () => {
  it('starts with default state', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.stock).toBe(100);
    expect(state.totalHarvested).toBe(0);
  });

  it('resolves a harvest round and reveals results', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_HARVEST',
      amount: 4,
    });
    expect(state.phase).toBe('reveal');
    expect(state.result).not.toBeNull();
    expect(state.playerHarvest).toBe(4);
    expect(state.result!.stockBefore).toBe(100);
    expect(state.result!.stockAfter).toBe(92);
  });

  it('reports the four villagers in the result', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_HARVEST',
      amount: 4,
    });
    expect(state.result!.botHarvests['mira']).toBe(4);
    expect(state.result!.botHarvests['pip']).toBe(2);
    expect(state.result!.botHarvests['grim']).toBe(5);
    expect(state.result!.botHarvests['cole']).toBe(8);
  });

  it('caps bot harvest when stock runs out', () => {
    let state = createInitialState();
    let guard = 0;
    while (state.phase !== 'done' && guard < 12) {
      state = gameReducer(state, { type: 'SUBMIT_HARVEST', amount: 8 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
      guard += 1;
    }
    expect(state.collapsed).toBe(true);
    expect(state.result!.stockAfter).toBe(0);
    expect(state.result!.botHarvests['cole']).toBe(0);
  });

  it('advances to the next round', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_HARVEST',
      amount: 4,
    });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(2);
    expect(state.stock).toBe(state.results[0].stockAfter);
  });

  it('ends the game immediately when the commons collapses', () => {
    let state = createInitialState();
    for (let i = 0; i < 7; i++) {
      state = gameReducer(state, { type: 'SUBMIT_HARVEST', amount: 8 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.collapsed).toBe(true);
  });

  it('finishes after TOTAL_ROUNDS when the commons survives', () => {
    const state = gameReducer(
      {
        ...createInitialState(),
        round: TOTAL_ROUNDS,
        collapsed: false,
        result: {
          round: TOTAL_ROUNDS,
          playerHarvest: 4,
          botHarvests: {},
          totalHarvest: 4,
          stockBefore: 30,
          stockAfter: 30,
          growth: 4,
          collapsed: false,
        },
      },
      { type: 'NEXT_ROUND' }
    );
    expect(state.phase).toBe('done');
    expect(state.collapsed).toBe(false);
    expect(state.results).toHaveLength(1);
  });

  it('ignores harvest when not in choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_HARVEST',
      amount: 4,
    });
    const before = state;
    const after = gameReducer(state, { type: 'SUBMIT_HARVEST', amount: 4 });
    expect(after.result).toBe(before.result);
  });

  it('ignores NEXT_ROUND without a result', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
  });

  it('resets to initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_HARVEST',
      amount: 4,
    });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.stock).toBe(100);
    expect(state.results).toEqual([]);
  });

  it('clamps the player harvest to the allowed range', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_HARVEST',
      amount: 20,
    });
    expect(state.playerHarvest).toBe(8);
  });

  it('tracks total harvested across rounds', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_HARVEST', amount: 4 });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = gameReducer(state, { type: 'SUBMIT_HARVEST', amount: 3 });
    expect(state.totalHarvested).toBe(7);
  });
});
