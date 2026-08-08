import { fireEvent, render, screen, within } from '@testing-library/react';
import { InvoicesTemplate } from '../InvoicesTemplate';

describe('InvoicesTemplate', () => {
  it('renders invoices with amounts, statuses and the summary', () => {
    render(<InvoicesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Invoices' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 invoices')).toBeInTheDocument();
    expect(screen.getByText('INV-001')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('$2,400')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Paid')).toHaveLength(3);
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
    expect(within(table).getAllByText('Overdue')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Mark paid' })).toHaveLength(
      3
    );
  });

  it('filters invoices by status', () => {
    render(<InvoicesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Paid' }));
    expect(screen.getByText('3 invoices')).toBeInTheDocument();
    expect(screen.getByText('INV-002')).toBeInTheDocument();
    expect(screen.queryByText('INV-001')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Overdue' }));
    expect(screen.getByText('1 invoices')).toBeInTheDocument();
    expect(screen.getByText('INV-003')).toBeInTheDocument();
    expect(screen.queryByText('Acme Corp')).not.toBeInTheDocument();
  });

  it('marks pending and overdue invoices as paid', () => {
    render(<InvoicesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Mark paid' })[0]);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Paid')).toHaveLength(4);
    expect(within(table).getAllByText('Pending')).toHaveLength(1);
    expect(within(table).getAllByText('Overdue')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Mark paid' })).toHaveLength(
      2
    );
    expect(screen.getByText('6 invoices')).toBeInTheDocument();
  });
});
