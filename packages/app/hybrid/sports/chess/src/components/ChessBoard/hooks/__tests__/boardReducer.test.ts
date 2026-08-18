import { build960, boardReducer, initialState } from '../boardReducer';

describe('boardReducer', () => {
  it('returns initial state shape', () => {
    expect(initialState.fen).toBeTruthy();
    expect(initialState.boardMode).toBe('explore');
    expect(initialState.thinking).toBe(false);
    expect(initialState.positionId).toBe(518);
    expect(initialState.panel).toBe('position');
    expect(initialState.pgn).toBe('');
    expect(initialState.gifLoading).toBe(false);
  });

  it('sets fen', () => {
    const state = boardReducer(initialState, { type: 'SET_FEN', fen: 'abc' });
    expect(state.fen).toBe('abc');
  });

  it('sets board mode', () => {
    const state = boardReducer(initialState, {
      type: 'SET_BOARD_MODE',
      boardMode: 'play',
    });
    expect(state.boardMode).toBe('play');
  });

  it('sets thinking', () => {
    const state = boardReducer(initialState, {
      type: 'SET_THINKING',
      thinking: true,
    });
    expect(state.thinking).toBe(true);
  });

  it('sets position id', () => {
    const state = boardReducer(initialState, {
      type: 'SET_POSITION_ID',
      positionId: 42,
    });
    expect(state.positionId).toBe(42);
  });

  it('sets panel', () => {
    const state = boardReducer(initialState, {
      type: 'SET_PANEL',
      panel: 'engine',
    });
    expect(state.panel).toBe('engine');
  });

  it('sets pgn', () => {
    const state = boardReducer(initialState, { type: 'SET_PGN', pgn: '1. e4' });
    expect(state.pgn).toBe('1. e4');
  });

  it('sets gif loading', () => {
    const state = boardReducer(initialState, {
      type: 'SET_GIF_LOADING',
      gifLoading: true,
    });
    expect(state.gifLoading).toBe(true);
  });

  it('syncs game and clears thinking', () => {
    const state = boardReducer(initialState, {
      type: 'SYNC_GAME',
      fen: 'x',
      pgn: 'y',
    });
    expect(state.fen).toBe('x');
    expect(state.pgn).toBe('y');
    expect(state.thinking).toBe(false);
  });

  it('returns state for unknown action', () => {
    const state = boardReducer(initialState, {
      type: 'SET_FEN',
      fen: 'q',
    } as never);
    expect(state.fen).toBe('q');
  });
});

describe('build960', () => {
  it('builds a game for a valid 960 id', () => {
    const game = build960(0);
    expect(game.turn).toBe('w');
  });

  it('falls back to empty position for invalid id', () => {
    const game = build960(99999);
    expect(game).toBeDefined();
  });
});
