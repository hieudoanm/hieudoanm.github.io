import { render, screen } from '@testing-library/react';

import NikoliNurikabePage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/nikoli/nurikabe/page';

describe('NikoliNurikabePage', () => {
  it('names the puzzle', () => {
    render(<NikoliNurikabePage />);

    expect(
      screen.getByRole('heading', { name: 'Nurikabe' })
    ).toBeInTheDocument();
  });

  it('describes what the puzzle trains', () => {
    render(<NikoliNurikabePage />);

    expect(
      screen.getByText(/every clue fixed by the connectivity rule/i)
    ).toBeInTheDocument();
  });

  it('links back to the Nikoli collection', () => {
    render(<NikoliNurikabePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Nikoli' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/nikoli');
  });

  it('mounts the puzzle inside the page', () => {
    render(<NikoliNurikabePage />);

    expect(
      screen.getByRole('button', { name: 'New Game' })
    ).toBeInTheDocument();
  });
});
