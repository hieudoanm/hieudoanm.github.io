import { render, screen, act } from '@testing-library/react';
import { HordeTab } from '../HordeTab';

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

describe('HordeTab', () => {
  it('renders initial state', () => {
    render(<HordeTab />);
    expect(screen.getByText('Pawn Horde')).toBeTruthy();
  });

  it('resets on reset click', () => {
    render(<HordeTab />);
    screen.getByText('Reset').click();
    expect(screen.getByText('Pawn Horde')).toBeTruthy();
  });

  it('handles a valid drop and engine reply', () => {
    jest.useFakeTimers();
    render(<HordeTab />);
    screen.getByTestId('drop-e2-e4').click();
    act(() => {
      jest.advanceTimersByTime(150);
    });
    jest.useRealTimers();
  });

  it('handles null targetSquare', () => {
    render(<HordeTab />);
    screen.getByTestId('drop-invalid').click();
  });
});
