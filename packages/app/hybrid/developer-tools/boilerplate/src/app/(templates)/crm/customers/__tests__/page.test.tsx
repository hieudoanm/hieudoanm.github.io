import { render, screen } from '@testing-library/react';
import CustomersPage from '@/app/(templates)/crm/customers/page';

describe('CustomersPage', () => {
  it('renders the CustomersPage', () => {
    render(<CustomersPage />);
    expect(screen.getByText('7 customers')).toBeInTheDocument();
  });
});
