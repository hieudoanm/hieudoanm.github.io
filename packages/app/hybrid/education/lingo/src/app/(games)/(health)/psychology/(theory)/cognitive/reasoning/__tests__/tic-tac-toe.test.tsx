import { render, screen } from '@testing-library/react';

import TicTacToePage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/tic-tac-toe/page';

describe('TicTacToePage', () => {
  it('names the collection', () => {
    render(<TicTacToePage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Tic-Tac-Toe' })
    ).toBeInTheDocument();
  });

  it('links back to the reasoning topic', () => {
    render(<TicTacToePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Reasoning' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning');
  });

  it('lists every variant in the collection', () => {
    render(<TicTacToePage />);

    for (const name of [
      'Classic',
      'Duck',
      'Notakto',
      'Reverse',
      'T3',
      'Wild',
    ]) {
      expect(
        screen.getByRole('link', { name: new RegExp(name) })
      ).toHaveAttribute(
        'href',
        `/psychology/cognitive/reasoning/tic-tac-toe/${name.toLowerCase()}`
      );
    }
  });
});
