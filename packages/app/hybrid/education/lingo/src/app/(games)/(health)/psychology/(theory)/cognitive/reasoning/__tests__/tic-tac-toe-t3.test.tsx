import { render, screen } from '@testing-library/react';

import T3Page from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/tic-tac-toe/t3/page';

describe('TicTacToeT3Page', () => {
  it('names the variant', () => {
    render(<T3Page />);

    expect(screen.getByRole('heading', { name: 'T3' })).toBeInTheDocument();
  });

  it('describes how the variant plays', () => {
    render(<T3Page />);

    expect(
      screen.getByText(/the fourth erases your oldest/i)
    ).toBeInTheDocument();
  });

  it('links back to the collection', () => {
    render(<T3Page />);

    expect(
      screen.getByRole('link', { name: '← Back to Tic-Tac-Toe' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/tic-tac-toe');
  });

  it('mounts the game inside the page', () => {
    render(<T3Page />);

    expect(screen.getAllByTestId(/^cell-/)).toHaveLength(9);
  });
});
