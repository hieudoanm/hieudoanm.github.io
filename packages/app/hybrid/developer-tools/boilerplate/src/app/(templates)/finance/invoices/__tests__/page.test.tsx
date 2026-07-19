import { render, screen } from '@testing-library/react';
import InvoicesPage from '@/app/(templates)/finance/invoices/page';

describe('InvoicesPage', () => {
  it('renders the InvoicesPage', () => {
    render(<InvoicesPage />);
    expect(screen.getByText('6 invoices')).toBeInTheDocument();
  });
});
