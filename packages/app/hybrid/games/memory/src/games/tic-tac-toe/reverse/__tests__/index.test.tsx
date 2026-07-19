import { fireEvent, render, screen } from '@testing-library/react';
import { Reverse } from '../index';

describe('Reverse', () => {
  it('renders the misere rules hint', () => {
    render(<Reverse />);
    expect(screen.getByText(/Misere tic-tac-toe/)).toBeInTheDocument();
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });

  it('announces the loser with their mark', () => {
    render(<Reverse />);
    for (const idx of [0, 3, 1, 4, 2]) {
      fireEvent.click(screen.getByTestId(`cell-${idx}`));
    }
    expect(screen.getByTestId('status')).toHaveTextContent(
      'X loses with 3 in a row!'
    );
  });

  it('resets after a loss', () => {
    render(<Reverse />);
    for (const idx of [0, 3, 1, 4, 2]) {
      fireEvent.click(screen.getByTestId(`cell-${idx}`));
    }
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('status')).not.toHaveTextContent(/loses/);
    expect(screen.getByTestId('cell-0')).toHaveTextContent('');
  });
});
