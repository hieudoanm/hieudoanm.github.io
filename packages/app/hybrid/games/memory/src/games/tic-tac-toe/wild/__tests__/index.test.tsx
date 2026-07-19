import { fireEvent, render, screen } from '@testing-library/react';
import { Wild } from '../index';

describe('Wild', () => {
  it('renders mark picker and board', () => {
    render(<Wild />);
    expect(screen.getByTestId('pick-x')).toBeInTheDocument();
    expect(screen.getByTestId('pick-o')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });

  it('places the selected mark', () => {
    render(<Wild />);
    fireEvent.click(screen.getByTestId('pick-o'));
    fireEvent.click(screen.getByTestId('cell-0'));
    expect(screen.getByTestId('cell-0')).toHaveTextContent('O');
  });

  it('announces the winning player number and mark', () => {
    render(<Wild />);
    for (const idx of [0, 3, 6]) {
      fireEvent.click(screen.getByTestId(`cell-${idx}`));
    }
    expect(screen.getByTestId('status')).toHaveTextContent(
      'Winner: Player 1 (X)'
    );
    expect(screen.getByTestId('cell-0').className).toContain('btn-warning');
  });

  it('resets the game', () => {
    render(<Wild />);
    fireEvent.click(screen.getByTestId('cell-8'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('cell-8')).toHaveTextContent('');
  });
});
