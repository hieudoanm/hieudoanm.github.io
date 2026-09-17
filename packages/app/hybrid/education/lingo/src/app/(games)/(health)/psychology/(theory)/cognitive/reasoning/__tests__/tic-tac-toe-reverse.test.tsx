import { render, screen } from '@testing-library/react';

import ReversePage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/tic-tac-toe/reverse/page';

describe('TicTacToeReversePage', () => {
  it('names the variant', () => {
    render(<ReversePage />);

    expect(
      screen.getByRole('heading', { name: 'Reverse' })
    ).toBeInTheDocument();
  });

  it('describes how the variant plays', () => {
    render(<ReversePage />);

    expect(
      screen.getByText(/avoid making three in a row at all costs/i)
    ).toBeInTheDocument();
  });

  it('links back to the collection', () => {
    render(<ReversePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Tic-Tac-Toe' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/tic-tac-toe');
  });

  it('mounts the game inside the page', () => {
    render(<ReversePage />);

    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });
});
