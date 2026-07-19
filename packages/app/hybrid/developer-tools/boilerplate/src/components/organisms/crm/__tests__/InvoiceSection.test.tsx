import { render, screen } from '@testing-library/react';
import { InvoiceSection } from '../InvoiceSection';

describe('InvoiceSection', () => {
  it('renders invoices with formatted amounts and statuses', () => {
    render(
      <InvoiceSection
        invoices={[
          {
            id: '1',
            number: 'INV-001',
            customer: 'Acme',
            amount: 1500.5,
            dueDate: '2026-03-01',
            status: 'paid',
          },
        ]}
      />
    );
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getAllByText('$1,500.50').length).toBeGreaterThan(0);
    expect(screen.getByText('paid')).toBeInTheDocument();
  });

  it('sums the invoice totals', () => {
    render(
      <InvoiceSection
        invoices={[
          { id: '1', number: 'INV-001', amount: 100 },
          { id: '2', number: 'INV-002', amount: 250 },
        ]}
      />
    );
    expect(screen.getByText('$350.00')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<InvoiceSection invoices={[]} />);
    expect(screen.getByText('No invoices.')).toBeInTheDocument();
  });
});
