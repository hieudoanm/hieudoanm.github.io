import { fireEvent, render, screen } from '@testing-library/react';
import { Duck } from '../index';

describe('Duck', () => {
  it('renders the duck hint and board', () => {
    render(<Duck />);
    expect(screen.getByText(/move the/)).toBeInTheDocument();
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });

  it('moves the duck on the second click of a turn', () => {
    render(<Duck />);
    fireEvent.click(screen.getByTestId('cell-0'));
    expect(screen.getByTestId('status')).toHaveTextContent(/move duck/);
    fireEvent.click(screen.getByTestId('cell-4'));
    expect(screen.getByTestId('status')).toHaveTextContent(/place mark/);
  });

  it('announces the winner', () => {
    render(<Duck />);
    for (const [mark, duck] of [
      [0, 8],
      [2, 7],
      [3, 5],
      [1, 4],
    ] as [number, number][]) {
      fireEvent.click(screen.getByTestId(`cell-${mark}`));
      fireEvent.click(screen.getByTestId(`cell-${duck}`));
    }
    fireEvent.click(screen.getByTestId('cell-6'));
    expect(screen.getByTestId('status')).toHaveTextContent('Winner: X');
  });

  it('resets the game including the duck', () => {
    render(<Duck />);
    fireEvent.click(screen.getByTestId('cell-0'));
    fireEvent.click(screen.getByTestId('cell-4'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('cell-4')).not.toHaveTextContent('\u{1F986}');
    expect(screen.getByTestId('moves')).toHaveTextContent('X moves: —');
  });
});
