import { fireEvent, render, screen, within } from '@testing-library/react';
import { RefundsTemplate } from '../RefundsTemplate';

describe('RefundsTemplate', () => {
  it('renders refunds with the pending summary', () => {
    render(<RefundsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Refunds' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 refunds pending')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Requested')).toHaveLength(3);
    expect(within(table).getAllByText('Approved')).toHaveLength(2);
    expect(within(table).getAllByText('Rejected')).toHaveLength(1);
  });

  it('approves a refund', () => {
    render(<RefundsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Approve' })[0]);
    expect(screen.getByText('2 refunds pending')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Approved')).toHaveLength(3);
    expect(within(table).getAllByText('Requested')).toHaveLength(2);
  });

  it('rejects a refund', () => {
    render(<RefundsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Reject' })[0]);
    expect(screen.getByText('2 refunds pending')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Rejected')).toHaveLength(2);
    expect(within(table).getAllByText('Requested')).toHaveLength(2);
  });
});
