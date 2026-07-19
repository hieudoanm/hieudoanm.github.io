import { render, screen } from '@testing-library/react';

import CounsellingTheoryPage from '@/app/(games)/(health)/psychology/(practices)/counselling/page';

describe('CounsellingTheoryPage', () => {
  it('renders the theory heading and section headers', () => {
    render(<CounsellingTheoryPage />);
    expect(
      screen.getByRole('heading', { name: 'Counselling Psychology' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What counselling is' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'The main approaches' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'What the evidence actually says' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Limits, ethics and scope' })
    ).toBeInTheDocument();
  });

  it('states the scope limits and does not overclaim', () => {
    render(<CounsellingTheoryPage />);
    expect(
      screen.getByText(/not a replacement for medical assessment/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/no single approach is clearly superior/i)
    ).toBeInTheDocument();
  });

  it('links back to the psychology hub and out to related scales', () => {
    render(<CounsellingTheoryPage />);
    expect(
      screen.getByRole('link', { name: /Back to Psychology/ })
    ).toHaveAttribute('href', '/psychology');
    expect(
      screen.getByRole('link', { name: /^Dyadic Adjustment Scale/ })
    ).toHaveAttribute('href', '/psychology/dyadic-adjustment-scale');
  });
});
