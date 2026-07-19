import { render, screen } from '@testing-library/react';

import Game2048Page from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/game2048/page';

describe('Game2048Page', () => {
  it('names the exercise', () => {
    render(<Game2048Page />);

    expect(screen.getByRole('heading', { name: '2048' })).toBeInTheDocument();
  });

  it('describes what the exercise trains', () => {
    render(<Game2048Page />);

    expect(
      screen.getByText(/planning several moves ahead/i)
    ).toBeInTheDocument();
  });

  it('links back to the reasoning topic', () => {
    render(<Game2048Page />);

    expect(
      screen.getByRole('link', { name: '← Back to Reasoning' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning');
  });

  it('mounts the exercise inside the page', () => {
    render(<Game2048Page />);

    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });
});
