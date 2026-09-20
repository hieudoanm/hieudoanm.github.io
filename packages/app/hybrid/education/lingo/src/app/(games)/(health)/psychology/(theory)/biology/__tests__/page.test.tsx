import { render, screen } from '@testing-library/react';

import BiologyTheoryPage from '@/app/(games)/(health)/psychology/(theory)/biology/page';

describe('BiologyTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<BiologyTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Biological Psychology' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Neurons and their electricity' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Where signals go' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Learning changes the wiring' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'The body shapes the mind' })
    ).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to related scales', () => {
    render(<BiologyTheoryPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', { name: /^Generalized Anxiety Disorder/ })
    ).toHaveAttribute('href', '/psychology/generalized-anxiety-disorder');
  });
});
