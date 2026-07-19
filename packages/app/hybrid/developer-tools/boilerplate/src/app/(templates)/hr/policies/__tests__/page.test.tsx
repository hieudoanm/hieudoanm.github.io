import { render, screen } from '@testing-library/react';
import PoliciesPage from '@/app/(templates)/hr/policies/page';

describe('PoliciesPage', () => {
  it('renders the PoliciesPage', () => {
    render(<PoliciesPage />);
    expect(screen.getByText('6 policies')).toBeInTheDocument();
  });
});
