import { fireEvent, render, screen } from '@testing-library/react';
import { T3 } from '../index';

describe('T3', () => {
  it('renders the three-mark rules hint', () => {
    render(<T3 />);
    expect(screen.getByText(/active marks/)).toBeInTheDocument();
  });

  it('wins with three marks in a row', () => {
    render(<T3 />);
    for (const idx of [0, 6, 1, 7, 2]) {
      fireEvent.click(screen.getByTestId(`cell-${idx}`));
    }
    expect(screen.getByTestId('status')).toHaveTextContent('Winner: X');
  });

  it('highlights the oldest mark before it disappears', () => {
    render(<T3 />);
    for (const idx of [0, 3, 1, 6, 8, 4]) {
      fireEvent.click(screen.getByTestId(`cell-${idx}`));
    }
    expect(screen.getByTestId('cell-0').className).toContain('opacity-50');
  });

  it('resets the board', () => {
    render(<T3 />);
    fireEvent.click(screen.getByTestId('cell-4'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('cell-4')).toHaveTextContent('');
  });
});
