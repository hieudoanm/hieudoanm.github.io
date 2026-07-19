import { render, screen } from '@testing-library/react';

import MindfulnessTheoryPage from '@/app/(games)/(health)/psychology/(practices)/mindfulness/page';

describe('MindfulnessTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<MindfulnessTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Mindfulness' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What the practice is' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What mindfulness is not' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'The evidence' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Practising it' })
    ).toBeInTheDocument();
  });

  it('states the limits rather than only the benefits', () => {
    render(<MindfulnessTheoryPage />);
    expect(
      screen.getByText(/not relaxation in a different chair/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/adverse effects/i)).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to related scales', () => {
    render(<MindfulnessTheoryPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', { name: /^Satisfaction With Life Scale/ })
    ).toHaveAttribute('href', '/psychology/satisfaction-with-life');
  });
});
