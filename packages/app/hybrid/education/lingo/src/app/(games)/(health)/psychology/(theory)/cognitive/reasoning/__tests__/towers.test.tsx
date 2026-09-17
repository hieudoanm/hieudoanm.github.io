import { render, screen } from '@testing-library/react';

import TowersPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/reasoning/towers/page';

describe('TowersPage', () => {
  it('names the exercise', () => {
    render(<TowersPage />);

    expect(
      screen.getByRole('heading', { name: 'Towers of Hanoi' })
    ).toBeInTheDocument();
  });

  it('describes what the exercise trains', () => {
    render(<TowersPage />);

    expect(screen.getByText(/recursion constraint/i)).toBeInTheDocument();
  });

  it('links back to the reasoning topic', () => {
    render(<TowersPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Reasoning' })
    ).toHaveAttribute('href', '/psychology/cognitive/reasoning');
  });

  it('mounts the exercise inside the page', () => {
    render(<TowersPage />);

    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });
});
