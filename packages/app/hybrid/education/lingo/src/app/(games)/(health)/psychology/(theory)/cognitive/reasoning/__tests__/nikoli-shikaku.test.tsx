import { render, screen } from '@testing-library/react';

import NikoliShikakuPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/nikoli/shikaku/page';

describe('NikoliShikakuPage', () => {
  it('names the puzzle', () => {
    render(<NikoliShikakuPage />);

    expect(
      screen.getByRole('heading', { name: 'Shikaku' })
    ).toBeInTheDocument();
  });

  it('describes what the puzzle trains', () => {
    render(<NikoliShikakuPage />);

    expect(screen.getByText(/each clue pins one region/i)).toBeInTheDocument();
  });

  it('links back to the Nikoli collection', () => {
    render(<NikoliShikakuPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Nikoli' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/nikoli');
  });

  it('mounts the puzzle inside the page', () => {
    render(<NikoliShikakuPage />);

    expect(
      screen.getByRole('button', { name: 'New Game' })
    ).toBeInTheDocument();
  });
});
