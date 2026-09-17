import { render, screen } from '@testing-library/react';

import MemoryPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/memory/page';

describe('MemoryPage', () => {
  it('renders the note title', () => {
    render(<MemoryPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Memory' })
    ).toBeInTheDocument();
  });

  it('renders the first section', () => {
    render(<MemoryPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Memory is not one thing' })
    ).toBeInTheDocument();
  });

  it('links back to the cognitive hub', () => {
    render(<MemoryPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Cognitive Psychology' })
    ).toHaveAttribute('href', '/psychology/cognitive');
  });

  it('links to every memory drill', () => {
    render(<MemoryPage />);

    const drills = [
      ['Memory Match', '/psychology/cognitive/memory/memory-match'],
      ['N-Back', '/psychology/cognitive/memory/n-back'],
      ['Pi', '/psychology/cognitive/memory/pi'],
      ['Recall', '/psychology/cognitive/memory/recall'],
    ] as const;

    for (const [label, href] of drills) {
      expect(
        screen.getByRole('link', { name: new RegExp(`^${label}`) })
      ).toHaveAttribute('href', href);
    }
  });

  it('links the working memory reference', () => {
    render(<MemoryPage />);

    expect(
      screen.getByRole('link', { name: 'Wikipedia: Working Memory' })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Working_memory');
  });
});
