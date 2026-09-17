import { render, screen } from '@testing-library/react';

import SocialTheoryPage from '@/app/(games)/(health)/psychology/(theory)/social/page';

describe('SocialTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<SocialTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Social Psychology' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'The situation does more work than you think',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Social cognition' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Conformity and influence' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Groups, identity and cooperation' })
    ).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to related scales', () => {
    render(<SocialTheoryPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', { name: /^Dyadic Adjustment Scale/ })
    ).toHaveAttribute('href', '/psychology/dyadic-adjustment-scale');
  });
});
