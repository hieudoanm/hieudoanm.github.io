import { fireEvent, render, screen } from '@testing-library/react';
import { Classic } from '../index';

describe('Classic', () => {
  it('renders an empty board and current turn', () => {
    render(<Classic />);
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
    expect(screen.getByTestId('status')).toHaveTextContent(/Current/);
  });

  it('places alternating marks on click', () => {
    render(<Classic />);
    fireEvent.click(screen.getByTestId('cell-0'));
    expect(screen.getByTestId('cell-0')).toHaveTextContent('X');
    fireEvent.click(screen.getByTestId('cell-4'));
    expect(screen.getByTestId('cell-4')).toHaveTextContent('O');
  });

  it('announces the winner across the winning line', () => {
    render(<Classic />);
    for (const idx of [0, 3, 1, 4, 2]) {
      fireEvent.click(screen.getByTestId(`cell-${idx}`));
    }
    expect(screen.getByTestId('status')).toHaveTextContent('Winner: X');
    for (const idx of [0, 1, 2]) {
      expect(screen.getByTestId(`cell-${idx}`).className).toContain(
        'btn-warning'
      );
    }
  });

  it('resets the board', () => {
    render(<Classic />);
    fireEvent.click(screen.getByTestId('cell-0'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('cell-0')).toHaveTextContent('');
    expect(screen.getByTestId('status')).toHaveTextContent(/Current/);
  });

  it('undoes the last move', () => {
    render(<Classic />);
    fireEvent.click(screen.getByTestId('cell-0'));
    fireEvent.click(screen.getByTestId('undo'));
    expect(screen.getByTestId('cell-0')).not.toHaveTextContent('X');
  });
});
