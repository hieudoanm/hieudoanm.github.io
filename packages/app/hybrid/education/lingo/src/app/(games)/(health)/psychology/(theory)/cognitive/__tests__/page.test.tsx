import { render, screen } from '@testing-library/react';

import CognitiveTheoryPage from '@/app/(games)/(health)/psychology/(theory)/cognitive/page';

describe('CognitiveTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<CognitiveTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Cognitive Psychology' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Attention is a filter, not a spotlight',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Working memory holds the present' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Long-term memory is many systems' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Language and executive control' })
    ).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to related scales', () => {
    render(<CognitiveTheoryPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', { name: /^Big Five Inventory/ })
    ).toHaveAttribute('href', '/psychology/big-five-inventory');
  });
});
