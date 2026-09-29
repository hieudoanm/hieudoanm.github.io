import { render, screen } from '@testing-library/react';

import JournalingTheoryPage from '@/app/(games)/(health)/psychology/(practices)/journaling/page';

describe('JournalingTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<JournalingTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Journaling' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Why writing helps' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Expressive versus analytic writing',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'A workable routine' })
    ).toBeInTheDocument();
  });

  it('distinguishes expressive from analytic writing', () => {
    render(<JournalingTheoryPage />);
    expect(screen.getByText(/Expressive writing/)).toBeInTheDocument();
    expect(screen.getByText(/Analytic writing/)).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to related scales', () => {
    render(<JournalingTheoryPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', { name: /^Beck Depression Inventory/ })
    ).toHaveAttribute('href', '/psychology/beck-depression-inventory');
  });
});
