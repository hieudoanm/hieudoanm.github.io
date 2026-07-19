import { fireEvent, render, screen } from '@testing-library/react';
import { InvoiceRow } from '../InvoiceRow';

describe('InvoiceRow', () => {
  it('renders customer, id, amount and date', () => {
    render(
      <InvoiceRow id="INV-001" customer="Acme" amount={120.5} date="Aug 8" />
    );
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.getByTestId('invoice-amount')).toHaveTextContent('$120.50');
    expect(screen.getByText('Aug 8')).toBeInTheDocument();
  });

  it('defaults status to pending', () => {
    render(
      <InvoiceRow id="INV-001" customer="Acme" amount={120} date="Aug 8" />
    );
    expect(screen.getByText('pending')).toHaveClass('badge-warning');
  });

  it('renders paid status', () => {
    render(
      <InvoiceRow
        id="INV-001"
        customer="Acme"
        amount={120}
        date="Aug 8"
        status="paid"
      />
    );
    expect(screen.getByText('paid')).toHaveClass('badge-success');
  });

  it('calls onSelect with invoice id', () => {
    const onSelect = jest.fn();
    render(
      <InvoiceRow
        id="INV-001"
        customer="Acme"
        amount={120}
        date="Aug 8"
        onSelect={onSelect}
      />
    );
    fireEvent.click(screen.getByTestId('invoice-row'));
    expect(onSelect).toHaveBeenCalledWith('INV-001');
  });
});
