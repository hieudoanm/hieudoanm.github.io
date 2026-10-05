import { render, screen } from '@testing-library/react';

import SnakePage from '@/app/(games)/(health)/psychology/(theory)/cognitive/attention/snake/page';

describe('SnakePage', () => {
  it('names the exercise', () => {
    render(<SnakePage />);

    expect(screen.getByRole('heading', { name: 'Snake' })).toBeInTheDocument();
  });

  it('describes what the exercise measures', () => {
    render(<SnakePage />);

    expect(
      screen.getByText(/inhibition under a shrinking time budget/i)
    ).toBeInTheDocument();
  });

  it('links back to the attention topic', () => {
    render(<SnakePage />);

    expect(
      screen.getByRole('link', { name: '← Back to Attention' })
    ).toHaveAttribute('href', '/psychology/cognitive/attention');
  });

  it('mounts the game inside the page', () => {
    render(<SnakePage />);

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
