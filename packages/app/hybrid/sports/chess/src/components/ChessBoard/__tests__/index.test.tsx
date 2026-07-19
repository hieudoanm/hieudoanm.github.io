import { render, screen } from '@testing-library/react';
import { ChessBoard } from '../index';

const state = {
  panel: 'position' as string,
  setupMode: false,
  setupFen: '',
};

jest.mock('../hooks/useChessBoard', () => ({
  useChessBoard: jest.fn(() => ({
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    startFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    boardMode: 'explore',
    thinking: false,
    positionId: 518,
    panel: state.panel,
    pgn: '',
    gifLoading: false,
    flipped: false,
    selectedSquare: null,
    legalTargets: [],
    moves: [],
    cursor: -1,
    depth: 15,
    theme: 'blue',
    pieceSet: 'standard',
    showNotation: true,
    side: 'white',
    odds: { remove: null },
    setupMode: state.setupMode,
    setupFen: state.setupFen,
    setupPalette: 'wP',
    keyboardBuffer: '',
    boardRef: { current: document.createElement('div') },
    whiteEval: 0.3,
    evalPercent: 55,
    evalLabel: '+0.3',
    statusLabel: null,
    dispatch: jest.fn(),
    handleFENChange: jest.fn(),
    handlePGNChange: jest.fn(),
    handle960IdChange: jest.fn(),
    randomize960: jest.fn(),
    resetToStart: jest.fn(),
    switchBoardMode: jest.fn(),
    handleOddsChange: jest.fn(),
    handleSideChange: jest.fn(),
    handleDepthChange: jest.fn(),
    setFlipped: jest.fn(),
    toggleNotation: jest.fn(),
    handleThemeChange: jest.fn(),
    handlePieceSetChange: jest.fn(),
    undo: jest.fn(),
    redo: jest.fn(),
    jumpTo: jest.fn(),
    onPieceDrop: jest.fn(),
    canDragPiece: jest.fn(),
    onSquareClick: jest.fn(),
    exportPNG: jest.fn(),
    exportGIF: jest.fn(),
    copyShareLink: jest.fn(),
    setup: {
      startSetup: jest.fn(),
      applySetup: jest.fn(),
      cancelSetup: jest.fn(),
      clearBoard: jest.fn(),
      setPalette: jest.fn(),
      setSetupFen: jest.fn(),
    },
    lines: [],
    linesBusy: false,
    analyzeLines: jest.fn(),
    graphPoints: [],
    graphBusy: false,
    computeGraph: jest.fn(),
  })),
}));

jest.mock('../hooks/useEcoData', () => ({
  useEcoData: jest.fn(() => ({
    group: '',
    subgroup: '',
    ecoIndex: 0,
    ecoOpening: null,
    ecoList: [],
    ecoFen: jest.fn(
      () => 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    ),
    cursor: 0,
    total: 0,
    moves: [],
    setCursor: jest.fn(),
    prev: jest.fn(),
    next: jest.fn(),
    start: jest.fn(),
    end: jest.fn(),
    handleGroupChange: jest.fn(),
    handleSubgroupChange: jest.fn(),
    handleOpeningChange: jest.fn(),
  })),
}));

jest.mock('../components/BoardSection', () => ({
  BoardSection: () => <div data-testid="board-section" />,
}));
jest.mock('../components/PositionPanel', () => ({
  PositionPanel: () => <div data-testid="position-panel" />,
}));
jest.mock('../components/EnginePanel', () => ({
  EnginePanel: () => <div data-testid="engine-panel" />,
}));
jest.mock('../components/ExportPanel', () => ({
  ExportPanel: () => <div data-testid="export-panel" />,
}));
jest.mock('../components/EcoPanel', () => ({
  EcoPanel: () => <div data-testid="eco-panel" />,
}));
jest.mock('../components/SetupPanel', () => ({
  SetupPanel: () => <div data-testid="setup-panel" />,
}));
jest.mock('../components/Header', () => ({
  Header: () => <div data-testid="header" />,
}));

const onClose = jest.fn();

const renderWithPanel = (panel: string, setupMode = false) => {
  state.panel = panel;
  state.setupMode = setupMode;
  return render(<ChessBoard onClose={onClose} />);
};

describe('ChessBoard', () => {
  beforeEach(() => {
    onClose.mockClear();
    state.panel = 'position';
    state.setupMode = false;
    state.setupFen = '';
  });

  it('renders with position panel by default', () => {
    renderWithPanel('position');
    expect(screen.getByTestId('board-section')).toBeTruthy();
    expect(screen.getByTestId('position-panel')).toBeTruthy();
  });

  it('renders engine panel', () => {
    renderWithPanel('engine');
    expect(screen.getByTestId('engine-panel')).toBeTruthy();
  });

  it('renders export panel', () => {
    renderWithPanel('export');
    expect(screen.getByTestId('export-panel')).toBeTruthy();
  });

  it('renders openings panel', () => {
    renderWithPanel('openings');
    expect(screen.getByTestId('eco-panel')).toBeTruthy();
  });

  it('renders setup panel', () => {
    renderWithPanel('setup');
    expect(screen.getByTestId('setup-panel')).toBeTruthy();
  });

  it('renders all panel tab buttons', () => {
    renderWithPanel('position');
    expect(screen.getByText('Position')).toBeTruthy();
    expect(screen.getByText('Engine')).toBeTruthy();
    expect(screen.getByText('Export')).toBeTruthy();
    expect(screen.getByText('Openings')).toBeTruthy();
    expect(screen.getByText('Setup')).toBeTruthy();
  });
});
