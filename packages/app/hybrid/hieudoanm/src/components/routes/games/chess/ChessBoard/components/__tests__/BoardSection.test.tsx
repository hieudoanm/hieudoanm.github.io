import { fireEvent, render, screen } from '@testing-library/react';
import type { RefObject } from 'react';
import { BoardSection } from '../BoardSection';
import type { BoardMode, SidePanel } from '../../types';

jest.mock('react-chessboard', () => ({
  Chessboard: () => <div data-testid="chessboard" />,
}));

const baseProps = {
  boardRef: { current: null } as RefObject<HTMLDivElement | null>,
  displayFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  panel: 'position' as SidePanel,
  boardMode: 'explore' as BoardMode,
  evalPercent: 50,
  evalLabel: '+0.00',
  statusLabel: null as string | null,
  ecoCursor: 0,
  ecoTotal: 0,
  ecoMoves: [],
  onPieceDrop: jest.fn(),
  canDragPiece: jest.fn(),
  onEcoCursorChange: jest.fn(),
  onEcoPrev: jest.fn(),
  onEcoNext: jest.fn(),
  onEcoStart: jest.fn(),
  onEcoEnd: jest.fn(),
};

describe('BoardSection', () => {
  it('renders chessboard', () => {
    render(<BoardSection {...baseProps} />);
    expect(screen.getByTestId('chessboard')).toBeInTheDocument();
  });

  it('shows eval bar in play mode', () => {
    render(<BoardSection {...baseProps} boardMode="play" />);
    expect(screen.getByText('+0.00')).toBeInTheDocument();
  });

  it('hides eval bar in explore mode', () => {
    const { container } = render(
      <BoardSection {...baseProps} boardMode="explore" />
    );
    const bar = container.querySelector('.opacity-0');
    expect(bar).toBeInTheDocument();
  });

  it('shows status label when provided', () => {
    render(
      <BoardSection {...baseProps} statusLabel="Check!" panel="position" />
    );
    expect(screen.getByText('Check!')).toBeInTheDocument();
  });

  it('hides status label in openings panel', () => {
    render(
      <BoardSection {...baseProps} statusLabel="Check!" panel="openings" />
    );
    expect(screen.queryByText('Check!')).not.toBeInTheDocument();
  });

  it('renders ECO navigator in openings panel', () => {
    render(
      <BoardSection
        {...baseProps}
        panel="openings"
        ecoCursor={2}
        ecoTotal={5}
        ecoMoves={['e4', 'e5', 'Nf3', 'Nc6', 'Bb5']}
      />
    );
    expect(screen.getByText('2/5')).toBeInTheDocument();
    expect(screen.getByText('Nf3')).toBeInTheDocument();
  });

  it('calls onEcoNext when next button clicked', () => {
    const onEcoNext = jest.fn();
    render(
      <BoardSection
        {...baseProps}
        panel="openings"
        ecoCursor={2}
        ecoTotal={5}
        ecoMoves={['e4', 'e5']}
        onEcoNext={onEcoNext}
      />
    );
    fireEvent.click(screen.getByText('▶️'));
    expect(onEcoNext).toHaveBeenCalled();
  });

  it('calls onEcoPrev when prev button clicked', () => {
    const onEcoPrev = jest.fn();
    render(
      <BoardSection
        {...baseProps}
        panel="openings"
        ecoCursor={2}
        ecoTotal={5}
        ecoMoves={['e4', 'e5']}
        onEcoPrev={onEcoPrev}
      />
    );
    fireEvent.click(screen.getByText('◀️'));
    expect(onEcoPrev).toHaveBeenCalled();
  });

  it('disables prev buttons at cursor 0', () => {
    render(
      <BoardSection
        {...baseProps}
        panel="openings"
        ecoCursor={0}
        ecoTotal={5}
        ecoMoves={['e4']}
      />
    );
    const buttons = screen.getAllByRole('button');
    const prevButtons = buttons.filter(
      (b) => b.textContent === '⏪' || b.textContent === '◀️'
    );
    prevButtons.forEach((b) => expect(b).toBeDisabled());
  });

  it('disables next buttons at cursor max', () => {
    render(
      <BoardSection
        {...baseProps}
        panel="openings"
        ecoCursor={5}
        ecoTotal={5}
        ecoMoves={['e4', 'e5', 'Nf3', 'Nc6', 'Bb5']}
      />
    );
    const buttons = screen.getAllByRole('button');
    const nextButtons = buttons.filter(
      (b) => b.textContent === '▶️' || b.textContent === '⏩'
    );
    nextButtons.forEach((b) => expect(b).toBeDisabled());
  });

  it('calls onEcoCursorChange when move clicked', () => {
    const onEcoCursorChange = jest.fn();
    render(
      <BoardSection
        {...baseProps}
        panel="openings"
        ecoCursor={1}
        ecoTotal={3}
        ecoMoves={['e4', 'e5', 'Nf3']}
        onEcoCursorChange={onEcoCursorChange}
      />
    );
    fireEvent.click(screen.getByText('Nf3'));
    expect(onEcoCursorChange).toHaveBeenCalledWith(3);
  });

  it('to match snapshot', () => {
    const { container } = render(<BoardSection {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
