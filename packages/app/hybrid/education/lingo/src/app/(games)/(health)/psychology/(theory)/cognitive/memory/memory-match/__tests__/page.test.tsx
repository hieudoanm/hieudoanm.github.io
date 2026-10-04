import { render, screen } from '@testing-library/react';

import MemoryMatch from '@/app/(games)/(health)/psychology/(theory)/cognitive/memory/memory-match/page';

describe('MemoryMatchPage', () => {
  it('names the exercise', () => {
    render(<MemoryMatch />);

    expect(
      screen.getByRole('heading', { name: 'Memory Match' })
    ).toBeInTheDocument();
  });

  it('describes what the exercise measures', () => {
    render(<MemoryMatch />);

    expect(screen.getByText(/Emoji card pairing grid/)).toBeInTheDocument();
  });

  it('links back to the memory topic', () => {
    render(<MemoryMatch />);

    expect(
      screen.getByRole('link', { name: '← Back to Memory' })
    ).toHaveAttribute('href', '/psychology/cognitive/memory');
  });

  it('mounts the game inside the page', () => {
    render(<MemoryMatch />);

    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });
});
