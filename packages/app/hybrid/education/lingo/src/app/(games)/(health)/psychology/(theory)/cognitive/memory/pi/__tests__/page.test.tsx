import { render, screen } from '@testing-library/react';

import PiPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/memory/pi/page';

describe('PiPage', () => {
  it('names the exercise', () => {
    render(<PiPage />);

    expect(screen.getByRole('heading', { name: 'Pi' })).toBeInTheDocument();
  });

  it('describes what the exercise measures', () => {
    render(<PiPage />);

    expect(screen.getByText(/no structure to infer/)).toBeInTheDocument();
  });

  it('links back to the memory topic', () => {
    render(<PiPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Memory' })
    ).toHaveAttribute('href', '/psychology/cognitive/memory');
  });

  it('mounts the game inside the page', () => {
    render(<PiPage />);

    expect(screen.getByRole('tab', { name: 'Practice' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Game' })).toBeInTheDocument();
  });
});
