import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThreeCheckTab } from '../ThreeCheckTab';

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

describe('ThreeCheckTab', () => {
  it('renders initial state with counts', () => {
    render(<ThreeCheckTab />);
    expect(screen.getByText(/White:/)).toBeTruthy();
    expect(screen.getByText(/Black:/)).toBeTruthy();
    expect(screen.getByText('Three-check')).toBeTruthy();
  });

  it('resets when reset button is clicked', () => {
    render(<ThreeCheckTab />);
    screen.getByText('Reset').click();
    expect(screen.getByText('Three-check')).toBeTruthy();
  });

  it('handles a valid drop and advances engine reply', () => {
    jest.useFakeTimers();
    render(<ThreeCheckTab />);
    screen.getByTestId('drop-e2-e4').click();
    act(() => {
      jest.advanceTimersByTime(150);
    });
    jest.useRealTimers();
  });

  it('handles null targetSquare', () => {
    render(<ThreeCheckTab />);
    screen.getByTestId('drop-invalid').click();
  });
});
