import { render, screen } from '@testing-library/react';

import NikoliMasyuPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/nikoli/masyu/page';

describe('NikoliMasyuPage', () => {
  it('names the puzzle', () => {
    render(<NikoliMasyuPage />);

    expect(screen.getByRole('heading', { name: 'Masyu' })).toBeInTheDocument();
  });

  it('describes what the puzzle trains', () => {
    render(<NikoliMasyuPage />);

    expect(
      screen.getByText(/straight at white, turned at black/i)
    ).toBeInTheDocument();
  });

  it('links back to the Nikoli collection', () => {
    render(<NikoliMasyuPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Nikoli' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning/nikoli');
  });

  it('mounts the puzzle inside the page', () => {
    render(<NikoliMasyuPage />);

    expect(
      screen.getByRole('button', { name: 'New Game' })
    ).toBeInTheDocument();
  });
});
