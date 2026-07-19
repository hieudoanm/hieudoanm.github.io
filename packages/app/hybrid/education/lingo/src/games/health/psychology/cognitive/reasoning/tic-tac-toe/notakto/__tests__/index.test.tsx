import { fireEvent, render, screen } from '@testing-library/react';
import { Notakto } from '../index';

describe('Notakto', () => {
  it('renders an empty board with player 1 to move', () => {
    render(<Notakto />);
    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
    expect(screen.getByTestId('status')).toHaveTextContent(/Player/);
  });

  it('announces the loser who completed a row', () => {
    render(<Notakto />);
    for (const idx of [0, 3, 1, 4, 2]) {
      fireEvent.click(screen.getByTestId(`cell-${idx}`));
    }
    expect(screen.getByTestId('status')).toHaveTextContent('Player 1 loses!');
    expect(screen.getByTestId('cell-0').className).toContain('btn-error');
  });

  it('undoes and resets', () => {
    render(<Notakto />);
    fireEvent.click(screen.getByTestId('cell-5'));
    fireEvent.click(screen.getByTestId('undo'));
    expect(screen.getByTestId('cell-5')).toHaveTextContent('');
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('moves')).toHaveTextContent('Player 1: —');
  });
});
