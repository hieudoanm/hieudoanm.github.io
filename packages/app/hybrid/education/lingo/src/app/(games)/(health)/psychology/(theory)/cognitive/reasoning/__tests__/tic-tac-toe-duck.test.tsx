import { render, screen } from '@testing-library/react';

import DuckPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/tic-tac-toe/duck/page';

describe('TicTacToeDuckPage', () => {
  it('names the variant', () => {
    render(<DuckPage />);

    expect(screen.getByRole('heading', { name: 'Duck' })).toBeInTheDocument();
  });

  it('describes how the variant plays', () => {
    render(<DuckPage />);

    expect(
      screen.getByText(/move the duck to block your opponent/i)
    ).toBeInTheDocument();
  });

  it('links back to the collection', () => {
    render(<DuckPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Tic-Tac-Toe' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/tic-tac-toe');
  });

  it('mounts the game inside the page', () => {
    render(<DuckPage />);

    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });
});
