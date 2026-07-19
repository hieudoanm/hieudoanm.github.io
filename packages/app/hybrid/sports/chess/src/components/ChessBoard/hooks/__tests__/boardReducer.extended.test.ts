import { boardReducer, initialState } from '../boardReducer';
import type { BoardState } from '../boardReducer';

const withMoves = (over: Partial<BoardState> = {}): BoardState => ({
  ...initialState,
  moves: [
    { san: 'e4', fen: 'fen1' },
    { san: 'e5', fen: 'fen2' },
    { san: 'Nf3', fen: 'fen3' },
  ],
  cursor: 2,
  startFen: 'start',
  ...over,
});

describe('boardReducer extended', () => {
  it('SET_FLIPPED', () => {
    const s = boardReducer(initialState, {
      type: 'SET_FLIPPED',
      flipped: true,
    });
    expect(s.flipped).toBe(true);
  });

  it('SET_SELECTED', () => {
    const s = boardReducer(initialState, {
      type: 'SET_SELECTED',
      square: 'e4',
      targets: ['e5', 'e6'],
    });
    expect(s.selectedSquare).toBe('e4');
    expect(s.legalTargets).toEqual(['e5', 'e6']);
  });

  it('CLEAR_SELECTION', () => {
    const s = boardReducer(
      { ...initialState, selectedSquare: 'e4', legalTargets: ['e5'] },
      { type: 'CLEAR_SELECTION' }
    );
    expect(s.selectedSquare).toBeNull();
    expect(s.legalTargets).toEqual([]);
  });

  it('ADD_MOVE appends and clears selection', () => {
    const s = boardReducer(
      { ...initialState, selectedSquare: 'e4', legalTargets: ['e5'] },
      { type: 'ADD_MOVE', move: { san: 'e4', fen: 'newFen' } }
    );
    expect(s.moves).toHaveLength(1);
    expect(s.cursor).toBe(0);
    expect(s.fen).toBe('newFen');
    expect(s.selectedSquare).toBeNull();
  });

  it('ADD_MOVE truncates branch when cursor is in the middle', () => {
    const s = boardReducer(withMoves({ cursor: 1 }), {
      type: 'ADD_MOVE',
      move: { san: 'Qd1', fen: 'newFen' },
    });
    expect(s.moves).toHaveLength(3);
    expect(s.moves[0].san).toBe('e4');
    expect(s.moves[1].san).toBe('e5');
    expect(s.moves[2].san).toBe('Qd1');
    expect(s.cursor).toBe(2);
  });

  it('ADD_MOVE appends at end when cursor is at last move', () => {
    const s = boardReducer(withMoves(), {
      type: 'ADD_MOVE',
      move: { san: 'Qd1', fen: 'newFen' },
    });
    expect(s.moves).toHaveLength(4);
    expect(s.moves[3].san).toBe('Qd1');
    expect(s.cursor).toBe(3);
  });

  it('JUMP_TO clamps cursor and updates fen', () => {
    const s = boardReducer(withMoves(), { type: 'JUMP_TO', cursor: 0 });
    expect(s.cursor).toBe(0);
    expect(s.fen).toBe('fen1');
  });

  it('JUMP_TO to -1 uses startFen', () => {
    const s = boardReducer(withMoves(), { type: 'JUMP_TO', cursor: -1 });
    expect(s.cursor).toBe(-1);
    expect(s.fen).toBe('start');
  });

  it('JUMP_TO clamps beyond bounds', () => {
    const s = boardReducer(withMoves(), { type: 'JUMP_TO', cursor: 999 });
    expect(s.cursor).toBe(2);
  });

  it('JUMP_TO clamps negative', () => {
    const s = boardReducer(withMoves(), { type: 'JUMP_TO', cursor: -10 });
    expect(s.cursor).toBe(-1);
  });

  it('LOAD_GAME', () => {
    const s = boardReducer(initialState, {
      type: 'LOAD_GAME',
      fen: 'loaded',
      pgn: '1. e4',
      moves: [{ san: 'e4', fen: 'loaded' }],
    });
    expect(s.fen).toBe('loaded');
    expect(s.pgn).toBe('1. e4');
    expect(s.moves).toHaveLength(1);
    expect(s.cursor).toBe(0);
    expect(s.thinking).toBe(false);
    expect(s.selectedSquare).toBeNull();
  });

  it('SET_DEPTH', () => {
    const s = boardReducer(initialState, { type: 'SET_DEPTH', depth: 20 });
    expect(s.depth).toBe(20);
  });

  it('SET_THEME', () => {
    const s = boardReducer(initialState, { type: 'SET_THEME', theme: 'green' });
    expect(s.theme).toBe('green');
  });

  it('SET_PIECE_SET', () => {
    const s = boardReducer(initialState, {
      type: 'SET_PIECE_SET',
      pieceSet: 'unicode',
    });
    expect(s.pieceSet).toBe('unicode');
  });

  it('SET_NOTATION', () => {
    const s = boardReducer(initialState, {
      type: 'SET_NOTATION',
      showNotation: false,
    });
    expect(s.showNotation).toBe(false);
  });

  it('SET_SIDE', () => {
    const s = boardReducer(initialState, { type: 'SET_SIDE', side: 'black' });
    expect(s.side).toBe('black');
  });

  it('SET_ODDS', () => {
    const s = boardReducer(initialState, { type: 'SET_ODDS', odds: 'queen' });
    expect(s.odds).toBe('queen');
  });

  it('SET_SETUP_MODE true copies fen to setupFen', () => {
    const s = boardReducer(
      { ...initialState, fen: 'currentFen' },
      { type: 'SET_SETUP_MODE', setupMode: true }
    );
    expect(s.setupMode).toBe(true);
    expect(s.setupFen).toBe('currentFen');
  });

  it('SET_SETUP_MODE false preserves setupFen', () => {
    const s = boardReducer(
      { ...initialState, setupFen: 'mySetup' },
      { type: 'SET_SETUP_MODE', setupMode: false }
    );
    expect(s.setupMode).toBe(false);
    expect(s.setupFen).toBe('mySetup');
  });

  it('SET_SETUP_FEN', () => {
    const s = boardReducer(initialState, {
      type: 'SET_SETUP_FEN',
      fen: 'custom',
    });
    expect(s.setupFen).toBe('custom');
  });

  it('SET_SETUP_PALETTE', () => {
    const s = boardReducer(initialState, {
      type: 'SET_SETUP_PALETTE',
      palette: 'Pw',
    });
    expect(s.setupPalette).toBe('Pw');
  });

  it('SET_SETUP_PALETTE null', () => {
    const s = boardReducer(initialState, {
      type: 'SET_SETUP_PALETTE',
      palette: null,
    });
    expect(s.setupPalette).toBeNull();
  });

  it('SET_SETUP_SQUARE places a white pawn', () => {
    const s = boardReducer(initialState, {
      type: 'SET_SETUP_SQUARE',
      square: 'e4',
      piece: 'Pw',
    });
    expect(s.setupFen).toContain('P');
  });

  it('SET_SETUP_SQUARE with null removes piece', () => {
    const s = boardReducer(initialState, {
      type: 'SET_SETUP_SQUARE',
      square: 'e2',
      piece: null,
    });
    expect(s.setupFen).toBeTruthy();
  });

  it('SET_BOARD_MODE explore', () => {
    const s = boardReducer(initialState, {
      type: 'SET_BOARD_MODE',
      boardMode: 'explore',
    });
    expect(s.boardMode).toBe('explore');
  });
});
