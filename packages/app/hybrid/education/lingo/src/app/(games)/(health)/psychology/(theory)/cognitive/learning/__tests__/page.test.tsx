import { render, screen } from '@testing-library/react';

import LearningPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/learning/page';

describe('LearningPage', () => {
  it('renders the note title', () => {
    render(<LearningPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Learning' })
    ).toBeInTheDocument();
  });

  it('renders the first section', () => {
    render(<LearningPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'What counts as learning' })
    ).toBeInTheDocument();
  });

  it('renders every section of the note', () => {
    render(<LearningPage />);

    const headings = screen
      .getAllByRole('heading', { level: 2 })
      .map((heading) => heading.textContent);

    expect(headings).toEqual([
      'What counts as learning',
      'Classical conditioning',
      'Operant conditioning',
      'Learning without reinforcement',
      'Cognitive accounts',
      'Learning is expensive and slow',
      'References',
    ]);
  });

  it('links back to the cognitive hub', () => {
    render(<LearningPage />);

    expect(
      screen.getByRole('link', { name: '← Back to Cognitive Psychology' })
    ).toHaveAttribute('href', '/psychology/cognitive');
  });

  it('links to the latent learning reference', () => {
    render(<LearningPage />);

    expect(
      screen.getByRole('link', { name: 'Wikipedia: Latent Learning' })
    ).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Latent_learning');
  });
});
