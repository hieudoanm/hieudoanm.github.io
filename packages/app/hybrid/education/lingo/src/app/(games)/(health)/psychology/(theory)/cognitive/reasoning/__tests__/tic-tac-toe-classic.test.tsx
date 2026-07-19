import { render, screen } from '@testing-library/react';

import ClassicPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/tic-tac-toe/classic/page';

describe('TicTacToeClassicPage', () => {
  it('names the variant', () => {
    render(<ClassicPage />);

    expect(
      screen.getByRole('heading', { name: 'Classic' })
    ).toBeInTheDocument();
  });

  it('describes how the variant plays', () => {
    render(<ClassicPage />);

    expect(screen.getByText(/line up three to win/i)).toBeInTheDocument();
  });

  it('links back to the collection', () => {
    render(<ClassicPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Tic-Tac-Toe' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/tic-tac-toe');
  });

  it('mounts the game inside the page', () => {
    render(<ClassicPage />);

    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });
});
