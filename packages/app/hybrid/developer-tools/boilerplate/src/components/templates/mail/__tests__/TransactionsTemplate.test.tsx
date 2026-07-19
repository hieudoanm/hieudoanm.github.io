import { fireEvent, render, screen, within } from '@testing-library/react';
import { TransactionsTemplate } from '../TransactionsTemplate';

describe('TransactionsTemplate', () => {
  it('renders transactions with action badges', () => {
    render(<TransactionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Transactions' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 transactions')).toBeInTheDocument();
    expect(screen.getByText('Aug 7, 2026')).toBeInTheDocument();
    expect(screen.getByText('$16,850.00')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Buy')).toHaveLength(3);
    expect(within(table).getAllByText('Sell')).toHaveLength(2);
  });

  it('toggles the new transaction confirmation', () => {
    render(<TransactionsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'New transaction' }));
    expect(
      screen.getByRole('button', { name: 'Transaction added' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Transaction added' }));
    expect(
      screen.getByRole('button', { name: 'New transaction' })
    ).toBeInTheDocument();
  });
});
