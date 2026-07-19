import { render, screen } from '@testing-library/react';

import NikoliHeyawakePage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/nikoli/heyawake/page';

describe('NikoliHeyawakePage', () => {
  it('names the puzzle', () => {
    render(<NikoliHeyawakePage />);

    expect(
      screen.getByRole('heading', { name: 'Heyawake' })
    ).toBeInTheDocument();
  });

  it('describes what the puzzle trains', () => {
    render(<NikoliHeyawakePage />);

    expect(
      screen.getByText(/local counts with global connectivity/i)
    ).toBeInTheDocument();
  });

  it('links back to the Nikoli collection', () => {
    render(<NikoliHeyawakePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Nikoli' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/nikoli');
  });

  it('mounts the puzzle inside the page', () => {
    render(<NikoliHeyawakePage />);

    expect(
      screen.getByRole('button', { name: 'New Game' })
    ).toBeInTheDocument();
  });
});
