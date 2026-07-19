import { render, screen } from '@testing-library/react';
import { InvoiceDashboard } from '../InvoiceDashboard';

const invoices = [
  {
    id: 'INV-001',
    client: 'Acme Corp',
    amount: 1200,
    dueDate: '2026-09-01',
    status: 'paid' as const,
  },
  {
    id: 'INV-002',
    client: 'Globex',
    amount: 800,
    dueDate: '2026-09-15',
    status: 'pending' as const,
  },
  {
    id: 'INV-003',
    client: 'Initech',
    amount: 450,
    dueDate: '2026-08-20',
    status: 'overdue' as const,
  },
];

describe('InvoiceDashboard', () => {
  it('renders invoice rows and status badges', () => {
    render(<InvoiceDashboard invoices={invoices} />);
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getAllByText('overdue').length).toBeGreaterThan(0);
  });

  it('computes the total outstanding amount', () => {
    render(<InvoiceDashboard invoices={invoices} />);
    expect(screen.getByTestId('outstanding')).toHaveTextContent('$1,250');
  });

  it('counts invoices per status', () => {
    render(<InvoiceDashboard invoices={invoices} />);
    expect(screen.getAllByText('paid').length).toBeGreaterThan(0);
    expect(screen.getAllByText('pending').length).toBeGreaterThan(0);
    expect(screen.getAllByText('overdue').length).toBeGreaterThan(0);
  });

  it('shows zero outstanding when everything is paid', () => {
    render(<InvoiceDashboard invoices={[{ ...invoices[0] }]} />);
    expect(screen.getByTestId('outstanding')).toHaveTextContent('$0');
  });
});
