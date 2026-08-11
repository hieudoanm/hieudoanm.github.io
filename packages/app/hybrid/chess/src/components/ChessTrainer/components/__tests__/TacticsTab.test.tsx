import { act, fireEvent, render, screen } from '@testing-library/react';
import { TacticsTab } from '../TacticsTab';

var captured: {
  onPieceDrop: (args: {
    sourceSquare: string;
    targetSquare: string | null;
  }) => boolean;
} | null = null;

jest.mock('react-chessboard', () => ({
  Chessboard: (props: {
    options: {
      onPieceDrop: (args: {
        sourceSquare: string;
        targetSquare: string | null;
      }) => boolean;
    };
  }) => {
    captured = props.options;
    return <div data-testid="chessboard" />;
  },
}));

describe('TacticsTab', () => {
  it('shows puzzle metadata and hint', () => {
    render(<TacticsTab />);
    expect(screen.getByText('Tactics')).toBeInTheDocument();
    expect(screen.getByText(/Puzzle 1 of/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Reveal hint'));
    expect(screen.getByText(/Back rank mate/)).toBeInTheDocument();
  });

  it('accepts the engine best move', () => {
    jest.useFakeTimers();
    render(<TacticsTab />);
    expect(captured).not.toBeNull();
    let result = false;
    act(() => {
      result = captured!.onPieceDrop({
        sourceSquare: 'e2',
        targetSquare: 'e4',
      });
    });
    expect(result).toBe(true);
    expect(screen.getByText('Correct!')).toBeInTheDocument();
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByText(/Puzzle 2 of/)).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('rejects a non-best move', () => {
    jest.useFakeTimers();
    render(<TacticsTab />);
    act(() => {
      captured!.onPieceDrop({ sourceSquare: 'a2', targetSquare: 'a3' });
    });
    expect(screen.getByText(/Not the best move/)).toBeInTheDocument();
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();
  });
});
