import { render, screen } from '@testing-library/react';

import RecallPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/memory/recall/page';

describe('RecallPage', () => {
  it('names the exercise', () => {
    render(<RecallPage />);

    expect(screen.getByRole('heading', { name: 'Recall' })).toBeInTheDocument();
  });

  it('describes what the exercise measures', () => {
    render(<RecallPage />);

    expect(screen.getByText(/serial position curve/)).toBeInTheDocument();
  });

  it('links back to the memory topic', () => {
    render(<RecallPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Memory' })
    ).toHaveAttribute('href', '/psychology/cognitive/memory');
  });

  it('mounts the game inside the page', () => {
    render(<RecallPage />);

    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  });
});
