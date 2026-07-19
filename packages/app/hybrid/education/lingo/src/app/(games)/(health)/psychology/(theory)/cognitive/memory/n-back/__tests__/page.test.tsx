import { render, screen } from '@testing-library/react';

import NBackPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/memory/n-back/page';

describe('NBackPage', () => {
  it('names the exercise', () => {
    render(<NBackPage />);

    expect(screen.getByRole('heading', { name: 'N-Back' })).toBeInTheDocument();
  });

  it('describes what the exercise measures', () => {
    render(<NBackPage />);

    expect(screen.getByText(/running representation/)).toBeInTheDocument();
  });

  it('links back to the memory topic', () => {
    render(<NBackPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Memory' })
    ).toHaveAttribute('href', '/psychology/cognitive/memory');
  });

  it('mounts the game inside the page', () => {
    render(<NBackPage />);

    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });
});
