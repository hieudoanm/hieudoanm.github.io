import { render, screen } from '@testing-library/react';

import NotaktoPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/tic-tac-toe/notakto/page';

describe('TicTacToeNotaktoPage', () => {
  it('names the variant', () => {
    render(<NotaktoPage />);

    expect(
      screen.getByRole('heading', { name: 'Notakto' })
    ).toBeInTheDocument();
  });

  it('describes how the variant plays', () => {
    render(<NotaktoPage />);

    expect(
      screen.getByText(/complete a row of three and you lose/i)
    ).toBeInTheDocument();
  });

  it('links back to the collection', () => {
    render(<NotaktoPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Tic-Tac-Toe' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/tic-tac-toe');
  });

  it('mounts the game inside the page', () => {
    render(<NotaktoPage />);

    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });
});
