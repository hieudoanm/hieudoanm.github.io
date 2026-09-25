import { render, screen } from '@testing-library/react';

import DevelopmentalTheoryPage from '@/app/(games)/(health)/psychology/(theory)/developmental/page';

describe('DevelopmentalTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<DevelopmentalTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Developmental Psychology' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Infancy: built for attachment' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Childhood: thinking changes shape' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Adolescence: a second opening' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Adulthood and later life' })
    ).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to related scales', () => {
    render(<DevelopmentalTheoryPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', { name: /^Relationship Closeness Inventory/ })
    ).toHaveAttribute('href', '/psychology/relationship-closeness-inventory');
  });
});
