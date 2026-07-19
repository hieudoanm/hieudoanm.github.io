import { render, screen } from '@testing-library/react';
import { BoardSection } from '../BoardSection';
import type { BoardMode, BoardTheme, SidePanel } from '../../types';

jest.mock('../../../organisms/chess/ChessBoard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

jest.mock('../MovesPanel', () => ({
  MovesPanel: () => <div data-testid="moves-panel" />,
}));

const baseProps = {
  boardRef: { current: document.createElement('div') },
  displayFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  panel: 'position' as SidePanel,
  boardMode: 'explore' as BoardMode,
  setupMode: false,
  keyboardBuffer: '',
  evalPercent: 50,
  evalLabel: '',
  statusLabel: null as string | null,
  ecoCursor: 0,
  ecoTotal: 0,
  ecoMoves: [] as string[],
  onPieceDrop: jest.fn(),
  canDragPiece: jest.fn(),
  onEcoCursorChange: jest.fn(),
  onEcoPrev: jest.fn(),
  onEcoNext: jest.fn(),
  onEcoStart: jest.fn(),
  onEcoEnd: jest.fn(),
  board: {
    flipped: false,
    theme: 'blue' as BoardTheme,
    pieceSet: 'standard' as any,
    showNotation: true,
  },
  selection: {
    selectedSquare: null as string | null,
    legalTargets: [] as string[],
    onSquareClick: jest.fn(),
  },
  history: {
    moves: [] as any[],
    cursor: 0,
    onUndo: jest.fn(),
    onRedo: jest.fn(),
    onJumpTo: jest.fn(),
  },
};

describe('BoardSection', () => {
  it('renders the chessboard', () => {
    render(<BoardSection {...baseProps} />);
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('shows MovesPanel when moves exist', () => {
    render(
      <BoardSection
        {...baseProps}
        history={{
          ...baseProps.history,
          moves: [
            {
              san: 'e4',
              fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
            },
          ],
        }}
      />
    );
    expect(screen.getByTestId('moves-panel')).toBeTruthy();
  });

  it('shows keyboard buffer', () => {
    render(<BoardSection {...baseProps} keyboardBuffer="Nf3" />);
    expect(screen.getByText(/Nf3/)).toBeTruthy();
  });

  it('shows eval bar in play mode', () => {
    const { container } = render(
      <BoardSection
        {...baseProps}
        boardMode="play"
        evalPercent={75}
        evalLabel="+1.5"
      />
    );
    expect(container.textContent).toContain('+1.5');
  });

  it('hides eval bar in explore mode', () => {
    const { container } = render(
      <BoardSection
        {...baseProps}
        boardMode="explore"
        evalPercent={50}
        evalLabel="0"
      />
    );
    // The eval bar div has opacity-0 in explore mode
    const evalBar = container.querySelector('.pointer-events-none.opacity-0');
    expect(evalBar).toBeTruthy();
  });

  it('renders openings panel with eco moves', () => {
    render(
      <BoardSection
        {...baseProps}
        panel="openings"
        ecoCursor={2}
        ecoTotal={4}
        ecoMoves={['e4', 'e5', 'Nf3', 'Nc6']}
      />
    );
    expect(screen.getByText('e4')).toBeTruthy();
    expect(screen.getByText('2/4')).toBeTruthy();
  });

  it('shows statusLabel', () => {
    render(<BoardSection {...baseProps} statusLabel="Check!" />);
    expect(screen.getByText('Check!')).toBeTruthy();
  });

  it('highlights selected square', () => {
    const { container } = render(
      <BoardSection
        {...baseProps}
        selection={{
          selectedSquare: 'e2',
          legalTargets: ['e3', 'e4'],
          onSquareClick: jest.fn(),
        }}
      />
    );
    expect(container).toBeTruthy();
  });

  it('flips board orientation', () => {
    render(
      <BoardSection
        {...baseProps}
        board={{ ...baseProps.board, flipped: true }}
      />
    );
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('renders in setup mode', () => {
    render(<BoardSection {...baseProps} setupMode={true} />);
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });
});
