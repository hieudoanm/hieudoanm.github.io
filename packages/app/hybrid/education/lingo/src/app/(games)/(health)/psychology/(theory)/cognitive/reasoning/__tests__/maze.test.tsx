import { render, screen } from '@testing-library/react';

import MazePage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/maze/page';

describe('MazePage', () => {
  it('names the exercise', () => {
    render(<MazePage />);

    expect(screen.getByRole('heading', { name: 'Maze' })).toBeInTheDocument();
  });

  it('describes what the exercise trains', () => {
    render(<MazePage />);

    expect(
      screen.getByText(/search with no dead ends assumed/i)
    ).toBeInTheDocument();
  });

  it('links back to the reasoning topic', () => {
    render(<MazePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Reasoning' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning');
  });

  it('mounts the exercise inside the page', () => {
    render(<MazePage />);

    expect(
      screen.getByRole('button', { name: 'New maze' })
    ).toBeInTheDocument();
  });
});
