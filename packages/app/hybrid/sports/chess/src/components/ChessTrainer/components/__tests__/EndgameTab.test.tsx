import { render, screen, act } from '@testing-library/react';
import { EndgameTab } from '../EndgameTab';

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
        }>
        Drop e2-e4
      </button>
      <button
        data-testid="drop-invalid"
        onClick={() =>
          onPieceDrop?.({ sourceSquare: 'e2', targetSquare: null })
        }>
        Drop invalid
      </button>
    </div>
  ),
}));

describe('EndgameTab', () => {
  it('renders initial state with presets', () => {
    render(<EndgameTab />);
    expect(screen.getByText('Endgame Practice')).toBeTruthy();
    expect(screen.getByText('Queen vs King')).toBeTruthy();
    expect(screen.getByText('Rook vs King')).toBeTruthy();
  });

  it('switches preset', () => {
    render(<EndgameTab />);
    screen.getByText('Rook vs King').click();
    expect(screen.getByText('Rook vs King')).toBeTruthy();
  });

  it('creates new position', () => {
    render(<EndgameTab />);
    screen.getByText('New position').click();
  });

  it('handles valid drop and engine reply', () => {
    jest.useFakeTimers();
    render(<EndgameTab />);
    screen.getByTestId('drop-e2-e4').click();
    act(() => {
      jest.advanceTimersByTime(150);
    });
    jest.useRealTimers();
  });

  it('handles null targetSquare', () => {
    render(<EndgameTab />);
    screen.getByTestId('drop-invalid').click();
  });
});
