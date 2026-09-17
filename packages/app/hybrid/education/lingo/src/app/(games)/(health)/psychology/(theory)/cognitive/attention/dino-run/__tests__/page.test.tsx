import { render, screen } from '@testing-library/react';

import DinoRunPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/attention/dino-run/page';

describe('DinoRunPage', () => {
  it('names the exercise', () => {
    render(<DinoRunPage />);

    expect(
      screen.getByRole('heading', { name: 'Dino Run' })
    ).toBeInTheDocument();
  });

  it('describes what the exercise measures', () => {
    render(<DinoRunPage />);

    expect(screen.getByText(/vigilance decay/i)).toBeInTheDocument();
  });

  it('links back to the attention topic', () => {
    render(<DinoRunPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Attention' })
    ).toHaveAttribute('href', '/psychology/cognitive/attention');
  });

  it('mounts the game inside the page', () => {
    render(<DinoRunPage />);

    expect(screen.getByRole('button', { name: 'Jump' })).toBeInTheDocument();
  });
});
