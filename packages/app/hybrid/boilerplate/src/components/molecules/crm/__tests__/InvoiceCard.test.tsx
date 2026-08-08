import { render, screen } from '@testing-library/react';
import { InvoiceCard } from '../InvoiceCard';

const items = [
  { label: 'Consulting', amount: 2000 },
  { label: 'Setup fee', amount: 500 },
];

describe('InvoiceCard', () => {
  it('renders the invoice id, customer and line items', () => {
    render(
      <InvoiceCard
        id="INV-001"
        customer="Acme"
        items={items}
        status="Pending"
      />
    );
    expect(screen.getByText('Invoice INV-001')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Consulting')).toBeInTheDocument();
  });

  it('computes and renders the total', () => {
    render(
      <InvoiceCard id="INV-001" customer="Acme" items={items} status="Paid" />
    );
    expect(screen.getByText('$2,500')).toBeInTheDocument();
  });

  it('applies the status badge variant', () => {
    render(
      <InvoiceCard
        id="INV-001"
        customer="Acme"
        items={items}
        status="Overdue"
      />
    );
    expect(screen.getByText('Overdue')).toHaveClass('badge-error');
  });
});
