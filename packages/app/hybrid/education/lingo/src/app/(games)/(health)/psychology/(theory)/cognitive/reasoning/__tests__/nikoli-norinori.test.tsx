import { render, screen } from '@testing-library/react';

import NikoliNorinoriPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/nikoli/norinori/page';

describe('NikoliNorinoriPage', () => {
  it('names the puzzle', () => {
    render(<NikoliNorinoriPage />);

    expect(
      screen.getByRole('heading', { name: 'Norinori' })
    ).toBeInTheDocument();
  });

  it('describes what the puzzle trains', () => {
    render(<NikoliNorinoriPage />);

    expect(
      screen.getByText(/adjacency and count together constrain the board/i)
    ).toBeInTheDocument();
  });

  it('links back to the Nikoli collection', () => {
    render(<NikoliNorinoriPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Nikoli' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/nikoli');
  });

  it('mounts the puzzle inside the page', () => {
    render(<NikoliNorinoriPage />);

    expect(
      screen.getByRole('button', { name: 'New Game' })
    ).toBeInTheDocument();
  });
});
