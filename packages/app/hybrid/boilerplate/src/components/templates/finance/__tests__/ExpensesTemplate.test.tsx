import { fireEvent, render, screen, within } from '@testing-library/react';
import { ExpensesTemplate } from '../ExpensesTemplate';

describe('ExpensesTemplate', () => {
  it('renders expenses with amounts, statuses and the summary line', () => {
    render(<ExpensesTemplate />);
    expect(screen.getByText('Flight to NYC')).toBeInTheDocument();
    expect(screen.getByText('$450.00')).toBeInTheDocument();
    expect(screen.getByText('1 of 4 approved')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Pending')).toHaveLength(2);
    expect(within(table).getAllByText('Approved')).toHaveLength(1);
    expect(within(table).getAllByText('Rejected')).toHaveLength(1);
  });

  it('filters expenses by status', () => {
    render(<ExpensesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Approved' }));
    expect(screen.getByText('Client dinner')).toBeInTheDocument();
    expect(screen.queryByText('Flight to NYC')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Rejected' }));
    expect(screen.getByText('Office supplies')).toBeInTheDocument();
    expect(screen.queryByText('Client dinner')).not.toBeInTheDocument();
  });

  it('approves and rejects expenses and updates the summary', () => {
    render(<ExpensesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Approve' })[0]);
    expect(screen.getByText('2 of 4 approved')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Reject' })[0]);
    expect(screen.getByText('1 of 4 approved')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Rejected')).toHaveLength(2);
  });
});
