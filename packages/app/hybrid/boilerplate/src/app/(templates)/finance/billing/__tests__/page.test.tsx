import { render, screen } from '@testing-library/react';
import BillingPage from '@/app/(templates)/finance/billing/page';

describe('BillingPage', () => {
  it('renders the BillingPage', () => {
    render(<BillingPage />);
    expect(screen.getByText('Current plan')).toBeInTheDocument();
  });
});
