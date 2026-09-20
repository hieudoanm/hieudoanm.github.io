import { createInitialState, gameReducer, GameState } from '../reducer';

describe('nash reducer', () => {
  it('starts a game with the chosen module', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      game: 'stag-hunt',
    });
    expect(state.phase).toBe('pick-row');
    expect(state.game).toBe('stag-hunt');
    expect(state.matrix).not.toBeNull();
  });

  it('selects a row and the AI picks a best-response column', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      game: 'stag-hunt',
    });
    state = gameReducer(state, { type: 'PLAY_ROW', row: 'Up' });
    expect(state.phase).toBe('verdict');
    expect(state.selectedRow).toBe('Up');
    expect(state.aiCol).toBe('Left');
    expect(state.lastResult?.isNE).toBe(true);
  });

  it('records a non-NE verdict for matching-pennies', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      game: 'matching-pennies',
    });
    state = gameReducer(state, { type: 'PLAY_ROW', row: 'Up' });
    expect(state.lastResult?.isNE).toBe(false);
    expect(state.neCount).toBe(0);
    expect(state.plays).toHaveLength(1);
  });

  it('advances to summary after 8 plays', () => {
    let state = createInitialState();
    for (let i = 0; i < 8; i++) {
      state = gameReducer(state, { type: 'START_GAME', game: 'stag-hunt' });
      state = gameReducer(state, { type: 'PLAY_ROW', row: 'Up' });
      state = gameReducer(state, { type: 'NEXT' });
    }
    expect(state.phase).toBe('summary');
  });

  it('ignores PLAY_ROW outside pick-row phase', () => {
    const initial = createInitialState();
    const result = gameReducer(initial, { type: 'PLAY_ROW', row: 'Up' });
    expect(result.phase).toBe('choose');
    expect(result.selectedRow).toBeNull();
  });

  it('resets to the initial state', () => {
    const state = gameReducer(createInitialState() as GameState, {
      type: 'RESET',
    });
    expect(state.phase).toBe('choose');
    expect(state.plays).toEqual([]);
    expect(state.neCount).toBe(0);
  });

  it('returns state unchanged on illegal NEXT from pick-row', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      game: 'stag-hunt',
    });
    const next = gameReducer(state, { type: 'NEXT' });
    expect(next.phase).toBe('pick-row');
  });
});
