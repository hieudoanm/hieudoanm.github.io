import { render, screen } from '@testing-library/react';

import NikoliFillominoPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/nikoli/fillomino/page';

describe('NikoliFillominoPage', () => {
  it('names the puzzle', () => {
    render(<NikoliFillominoPage />);

    expect(
      screen.getByRole('heading', { name: 'Fillomino' })
    ).toBeInTheDocument();
  });

  it('describes what the puzzle trains', () => {
    render(<NikoliFillominoPage />);

    expect(
      screen.getByText(/every cell arbitrated by the size rule/i)
    ).toBeInTheDocument();
  });

  it('links back to the Nikoli collection', () => {
    render(<NikoliFillominoPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Nikoli' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/nikoli');
  });

  it('mounts the puzzle inside the page', () => {
    render(<NikoliFillominoPage />);

    expect(
      screen.getByRole('button', { name: 'New Game' })
    ).toBeInTheDocument();
  });
});
