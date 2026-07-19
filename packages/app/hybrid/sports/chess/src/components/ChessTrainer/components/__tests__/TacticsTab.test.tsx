import { render, screen, act } from '@testing-library/react';
import { TacticsTab } from '../TacticsTab';

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

describe('TacticsTab', () => {
  it('renders initial state with score', () => {
    render(<TacticsTab />);
    expect(screen.getByText('Tactics')).toBeTruthy();
    expect(screen.getByText(/Score:/)).toBeTruthy();
  });

  it('reveal hint button shows hint', () => {
    render(<TacticsTab />);
    screen.getByText('Reveal hint').click();
  });

  it('reset button resets score', () => {
    render(<TacticsTab />);
    screen.getByText('Reset').click();
  });

  it('handles valid drop and advance', () => {
    jest.useFakeTimers();
    render(<TacticsTab />);
    screen.getByTestId('drop-e2-e4').click();
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    jest.useRealTimers();
  });

  it('handles null targetSquare', () => {
    render(<TacticsTab />);
    screen.getByTestId('drop-invalid').click();
  });
});
