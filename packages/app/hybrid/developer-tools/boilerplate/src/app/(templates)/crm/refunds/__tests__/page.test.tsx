import { render, screen } from '@testing-library/react';
import RefundsPage from '@/app/(templates)/crm/refunds/page';

describe('RefundsPage', () => {
  it('renders the RefundsPage', () => {
    render(<RefundsPage />);
    expect(screen.getByText('3 refunds pending')).toBeInTheDocument();
  });
});
