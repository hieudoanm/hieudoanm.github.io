import PoliciesPage from '@/app/(games)/market-failures/policies/page';
import { render, screen } from '@testing-library/react';

describe('PoliciesPage', () => {
  it('renders the Market Failure Fixer', () => {
    render(<PoliciesPage />);
    expect(
      screen.getByRole('heading', { name: /Market Failure Fixer/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('scenario')).toBeInTheDocument();
    expect(screen.getByTestId('policy-options')).toBeInTheDocument();
  });
});
