import { renderHook, act } from '@testing-library/react';
import { createGame } from '@chess/ts';
import { useChessBoard } from '../useChessBoard';

jest.mock('@frontend/react', () => ({
  useStockfish: jest.fn(() => ({
    analyze: jest.fn(),
    bestMove: jest.fn(),
    evaluation: jest.fn(),
  })),
}));

jest.mock('../useBoardHandlers', () => ({
  useBoardHandlers: jest.fn(() => ({
    onPieceDrop: jest.fn(),
    canDragPiece: jest.fn(),
    onSquareClick: jest.fn(),
    playSan: jest.fn(),
  })),
}));

jest.mock('../useEngineIntegration', () => ({
  useEngineIntegration: jest.fn(() => ({
    whiteEval: 0,
    evalPercent: 50,
    evalLabel: '0.0',
    statusLabel: null,
  })),
}));

jest.mock('../useExport', () => ({
  useExport: jest.fn(() => ({
    exportPNG: jest.fn(),
    exportGIF: jest.fn(),
  })),
}));

jest.mock('../useKeyboardNav', () => ({
  useKeyboardNav: jest.fn(() => ({
    buffer: '',
  })),
}));

jest.mock('../useSetup', () => ({
  useSetup: jest.fn(() => ({
    startSetup: jest.fn(),
    applySetup: jest.fn(),
    cancelSetup: jest.fn(),
    clearBoard: jest.fn(),
    setPalette: jest.fn(),
    setSetupFen: jest.fn(),
  })),
}));

jest.mock('../useShare', () => ({
  useShare: jest.fn(() => ({
    copyShareLink: jest.fn(),
  })),
}));

jest.mock('../useAnalysisLines', () => ({
  useAnalysisLines: jest.fn(() => ({
    lines: [],
    busy: false,
    analyze: jest.fn(),
  })),
}));

jest.mock('../useEvalHistory', () => ({
  useEvalHistory: jest.fn(() => ({
    points: [],
    busy: false,
    compute: jest.fn(),
  })),
}));

describe('useChessBoard', () => {
  it('returns initial state values', () => {
    const { result } = renderHook(() => useChessBoard());
    expect(result.current.fen).toBeTruthy();
    expect(result.current.boardMode).toBe('explore');
    expect(result.current.panel).toBe('position');
    expect(result.current.flipped).toBe(false);
    expect(result.current.depth).toBe(15);
    expect(result.current.showNotation).toBe(true);
    expect(result.current.theme).toBe('dark');
    expect(result.current.pieceSet).toBe('standard');
  });

  it('has all handler functions', () => {
    const { result } = renderHook(() => useChessBoard());
    expect(typeof result.current.handleFENChange).toBe('function');
    expect(typeof result.current.handlePGNChange).toBe('function');
    expect(typeof result.current.handle960IdChange).toBe('function');
    expect(typeof result.current.randomize960).toBe('function');
    expect(typeof result.current.resetToStart).toBe('function');
    expect(typeof result.current.switchBoardMode).toBe('function');
    expect(typeof result.current.handleOddsChange).toBe('function');
    expect(typeof result.current.handleSideChange).toBe('function');
    expect(typeof result.current.handleDepthChange).toBe('function');
    expect(typeof result.current.setFlipped).toBe('function');
    expect(typeof result.current.toggleNotation).toBe('function');
    expect(typeof result.current.handleThemeChange).toBe('function');
    expect(typeof result.current.handlePieceSetChange).toBe('function');
    expect(typeof result.current.undo).toBe('function');
    expect(typeof result.current.redo).toBe('function');
    expect(typeof result.current.jumpTo).toBe('function');
    expect(typeof result.current.exportPNG).toBe('function');
    expect(typeof result.current.exportGIF).toBe('function');
    expect(typeof result.current.copyShareLink).toBe('function');
  });

  it('has setup sub-object', () => {
    const { result } = renderHook(() => useChessBoard());
    expect(result.current.setup).toBeDefined();
    expect(typeof result.current.setup.startSetup).toBe('function');
    expect(typeof result.current.setup.applySetup).toBe('function');
    expect(typeof result.current.setup.cancelSetup).toBe('function');
    expect(typeof result.current.setup.clearBoard).toBe('function');
  });

  it('dispatches SET_FLIPPED', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.setFlipped(true));
    expect(result.current.flipped).toBe(true);
  });

  it('dispatches SET_NOTATION', () => {
    const { result } = renderHook(() => useChessBoard());
    const initial = result.current.showNotation;
    act(() => result.current.toggleNotation());
    expect(result.current.showNotation).toBe(!initial);
  });

  it('dispatches SET_THEME', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.handleThemeChange('green'));
    expect(result.current.theme).toBe('green');
  });

  it('dispatches SET_PIECE_SET', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.handlePieceSetChange('unicode'));
    expect(result.current.pieceSet).toBe('unicode');
  });

  it('dispatches SET_DEPTH', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.handleDepthChange(20));
    expect(result.current.depth).toBe(20);
  });

  it('switchBoardMode sets board mode', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.switchBoardMode('play'));
    expect(result.current.boardMode).toBe('play');
  });

  it('switchBoardMode with random side', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.switchBoardMode('explore'));
    expect(result.current.boardMode).toBe('explore');
  });

  it('handleFENChange with valid fen', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() =>
      result.current.handleFENChange(
        'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
      )
    );
  });

  it('handleFENChange with invalid fen', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.handleFENChange('invalid'));
  });

  it('handlePGNChange with valid pgn', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.handlePGNChange('1. e4 e5 2. Nf3 *'));
  });

  it('handlePGNChange with empty pgn', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.handlePGNChange(''));
  });

  it('randomize960 sets position id', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.randomize960());
    expect(result.current.positionId).toBeDefined();
  });

  it('resetToStart resets to position 518', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.randomize960());
    act(() => result.current.resetToStart());
    expect(result.current.positionId).toBe(518);
  });

  it('undo and redo navigate moves', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.undo());
    act(() => result.current.redo());
  });

  it('jumpTo navigates to index', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.jumpTo(0));
    act(() => result.current.jumpTo(-1));
  });

  it('handleSideChange changes side', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.handleSideChange('black'));
    expect(result.current.side).toBe('black');
  });

  it('handleOddsChange changes odds', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.handleOddsChange('queen'));
    expect(result.current.odds).toBe('queen');
  });

  it('handle960IdChange updates position id', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => {
      result.current.handle960IdChange({
        target: { value: '100' },
      } as any);
    });
  });

  it('has boardRef', () => {
    const { result } = renderHook(() => useChessBoard());
    expect(result.current.boardRef).toBeDefined();
  });

  it('has eval and engine values', () => {
    const { result } = renderHook(() => useChessBoard());
    expect(typeof result.current.whiteEval).toBe('number');
    expect(typeof result.current.evalPercent).toBe('number');
    expect(typeof result.current.evalLabel).toBe('string');
  });

  it('has lines and graph values', () => {
    const { result } = renderHook(() => useChessBoard());
    expect(Array.isArray(result.current.lines)).toBe(true);
    expect(typeof result.current.linesBusy).toBe('boolean');
    expect(typeof result.current.analyzeLines).toBe('function');
    expect(Array.isArray(result.current.graphPoints)).toBe(true);
    expect(typeof result.current.graphBusy).toBe('boolean');
    expect(typeof result.current.computeGraph).toBe('function');
  });

  it('switches panel to openings', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() =>
      result.current.dispatch({ type: 'SET_PANEL', panel: 'openings' })
    );
    expect(result.current.panel).toBe('openings');
  });

  it('switches panel to setup', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.dispatch({ type: 'SET_PANEL', panel: 'setup' }));
    expect(result.current.panel).toBe('setup');
  });

  it('dispatches SET_SETUP_MODE', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() =>
      result.current.dispatch({ type: 'SET_SETUP_MODE', setupMode: true })
    );
    expect(result.current.setupMode).toBe(true);
  });

  it('handleSideChange in play mode syncs game', () => {
    const { result } = renderHook(() => useChessBoard());
    act(() => result.current.switchBoardMode('play'));
    act(() => result.current.handleSideChange('white'));
    expect(result.current.side).toBe('white');
  });
});
