import { render, screen } from '@testing-library/react';

import WildPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/tic-tac-toe/wild/page';

describe('TicTacToeWildPage', () => {
  it('names the variant', () => {
    render(<WildPage />);

    expect(screen.getByRole('heading', { name: 'Wild' })).toBeInTheDocument();
  });

  it('describes how the variant plays', () => {
    render(<WildPage />);

    expect(
      screen.getByText(/either mark can win the game/i)
    ).toBeInTheDocument();
  });

  it('links back to the collection', () => {
    render(<WildPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Tic-Tac-Toe' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/tic-tac-toe');
  });

  it('mounts the game inside the page', () => {
    render(<WildPage />);

    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });
});
