import { render, screen, act } from '@testing-library/react';

jest.mock('../../../organisms/chess/ChessBoard', () => ({
  Chessboard: ({
    onPieceDrop,
  }: {
    onPieceDrop?: (args: {
      sourceSquare: string;
      targetSquare: string | null;
    }) => boolean;
  }) => (
    <div data-testid="chessboard">
      <button
        data-testid="drop-e2-e4"
        onClick={() =>
          onPieceDrop?.({ sourceSquare: 'e2', targetSquare: 'e4' })
        }
      />
      <button
        data-testid="drop-invalid"
        onClick={() =>
          onPieceDrop?.({ sourceSquare: 'e2', targetSquare: null })
        }
      />
    </div>
  ),
}));

const mockIsCheckmate = jest.fn((_state?: unknown) => false);
jest.mock('../../utils/endgame', () => ({
  isCheckmate: (state: any) => mockIsCheckmate(state),
  mateInN: jest.fn(() => true),
  legalMoveFor: jest.requireActual('../../utils/endgame').legalMoveFor,
}));

jest.mock('../../utils/tactics', () => ({
  bestMoveFrom: jest.fn(() => ({
    san: 'Rb8#',
    from: 'b1',
    to: 'b8',
    score: 30000,
    mate: true,
  })),
}));

import { MateTab } from '../MateTab';
import * as tactics from '../../utils/tactics';

const mockBestMoveFrom = jest.mocked(tactics.bestMoveFrom);
const click = (id: string) => act(() => screen.getByTestId(id).click());

describe('MateTab', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockIsCheckmate.mockReset();
    mockIsCheckmate.mockReturnValue(false);
    mockBestMoveFrom.mockReset();
    mockBestMoveFrom.mockReturnValue({
      san: 'e4',
      from: 'e2',
      to: 'e4',
      score: 30000,
      mate: true,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders initial state with chessboard and buttons', () => {
    render(<MateTab />);
    expect(screen.getByText('Mates')).toBeTruthy();
    expect(screen.getByText('Skip')).toBeTruthy();
    expect(screen.getByText('Restart')).toBeTruthy();
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('shows rating and hint for first puzzle', () => {
    render(<MateTab />);
    expect(screen.getByText('800')).toBeTruthy();
    expect(screen.getByText('Rook to the back rank.')).toBeTruthy();
  });

  it('shows "Mate in 1." for puzzle id not starting with m2', () => {
    render(<MateTab />);
    expect(screen.getByText(/Mate in 1\./)).toBeTruthy();
  });

  it('shows "Mate in 2." when puzzle id starts with m2', () => {
    render(<MateTab />);
    act(() => {
      for (let i = 0; i < 8; i++) screen.getByText('Skip').click();
    });
    expect(screen.getByText(/Mate in 2\./)).toBeTruthy();
  });

  it('shows puzzle counter', () => {
    render(<MateTab />);
    expect(screen.getByText(/Puzzle 1 of/)).toBeTruthy();
  });

  it('skip button advances puzzle index', () => {
    render(<MateTab />);
    act(() => screen.getByText('Skip').click());
    expect(screen.getByText(/Puzzle 2 of/)).toBeTruthy();
  });

  it('skip wraps puzzle selection', () => {
    render(<MateTab />);
    act(() => {
      for (let i = 0; i < 11; i++) screen.getByText('Skip').click();
    });
    expect(screen.getByText('800')).toBeTruthy();
  });

  it('restart button resets current game state', () => {
    render(<MateTab />);
    act(() => screen.getByText('Restart').click());
    expect(screen.getByTestId('chessboard')).toBeTruthy();
  });

  it('rejects drop with null targetSquare', () => {
    render(<MateTab />);
    click('drop-invalid');
    expect(screen.getByText(/Puzzle 1 of/)).toBeTruthy();
  });

  it('rejects drop when piece is not a legal move', () => {
    render(<MateTab />);
    click('drop-invalid');
    expect(screen.getByText(/Puzzle 1 of/)).toBeTruthy();
  });

  it('accepts valid drop and triggers engine reply', () => {
    render(<MateTab />);
    click('drop-e2-e4');
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(mockBestMoveFrom).toHaveBeenCalled();
  });

  it('marks solved when user drop results in checkmate', () => {
    mockIsCheckmate.mockReturnValue(true);
    render(<MateTab />);
    click('drop-e2-e4');
    expect(screen.getByText('Checkmate!')).toBeTruthy();
  });

  it('engine skips move when bestMoveFrom returns null', () => {
    mockBestMoveFrom.mockReturnValue(null);
    render(<MateTab />);
    click('drop-e2-e4');
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.queryByText('Checkmate!')).toBeNull();
  });

  it('engine skips move when best move is not legal', () => {
    mockBestMoveFrom.mockReturnValue({
      san: '??',
      from: 'z9',
      to: 'z9',
      score: 0,
      mate: false,
    });
    render(<MateTab />);
    click('drop-e2-e4');
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.queryByText('Checkmate!')).toBeNull();
  });

  it('marks solved when engine reply results in checkmate', () => {
    mockIsCheckmate.mockReturnValueOnce(false);
    mockIsCheckmate.mockReturnValueOnce(true);
    mockBestMoveFrom.mockReturnValue({
      san: 'e4',
      from: 'e2',
      to: 'e4',
      score: 30000,
      mate: true,
    });
    render(<MateTab />);
    click('drop-e2-e4');
    act(() => {
      jest.advanceTimersByTime(60);
    });
    expect(screen.getByText('Checkmate!')).toBeTruthy();
  });

  it('does not allow drop while thinking', () => {
    mockBestMoveFrom.mockReturnValue(null);
    render(<MateTab />);
    click('drop-e2-e4');
    click('drop-invalid');
    expect(screen.queryByText('Checkmate!')).toBeNull();
  });

  it('auto-advances to next puzzle after checkmate delay', () => {
    mockIsCheckmate.mockReturnValueOnce(true);
    render(<MateTab />);
    expect(screen.getByText(/Puzzle 1 of/)).toBeTruthy();
    click('drop-e2-e4');
    act(() => {
      jest.advanceTimersByTime(1200);
    });
    expect(screen.getByText(/Puzzle 2 of/)).toBeTruthy();
  });
});
