import { render, screen } from '@testing-library/react';

import SlidingPuzzlePage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/sliding-puzzle/page';

describe('SlidingPuzzlePage', () => {
  it('names the exercise', () => {
    render(<SlidingPuzzlePage />);

    expect(
      screen.getByRole('heading', { name: 'Sliding Puzzle' })
    ).toBeInTheDocument();
  });

  it('describes what the exercise trains', () => {
    render(<SlidingPuzzlePage />);

    expect(screen.getByText(/spatial planning problem/i)).toBeInTheDocument();
  });

  it('links back to the reasoning topic', () => {
    render(<SlidingPuzzlePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Reasoning' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning');
  });

  it('mounts the exercise inside the page', () => {
    render(<SlidingPuzzlePage />);

    expect(screen.getByText('Click or drag an image here')).toBeInTheDocument();
  });
});
