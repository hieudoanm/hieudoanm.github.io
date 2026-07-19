import { fireEvent, render, screen, within } from '@testing-library/react';
import { TransactionsTemplate } from '../TransactionsTemplate';

describe('TransactionsTemplate', () => {
  it('renders transactions with a net balance and type badges', () => {
    render(<TransactionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Transactions' })
    ).toBeInTheDocument();
    expect(screen.getByText('Net balance')).toBeInTheDocument();
    expect(screen.getByText('$3,041')).toBeInTheDocument();
    expect(screen.getByText('Client payment')).toBeInTheDocument();
    expect(screen.getByText('$4,800')).toBeInTheDocument();
    expect(screen.getByText('$-2,400')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Income')).toHaveLength(3);
    expect(within(table).getAllByText('Expense')).toHaveLength(4);
  });

  it('filters transactions and recomputes the net balance', () => {
    render(<TransactionsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Income' }));
    expect(screen.getByText('$7,350')).toBeInTheDocument();
    expect(screen.getByText('Client payment')).toBeInTheDocument();
    expect(screen.queryByText('Cloud hosting')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('$3,041')).toBeInTheDocument();
  });

  it('shows a negative net balance when filtered to expenses', () => {
    render(<TransactionsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Expense' }));
    expect(screen.getByText('$-4,309')).toBeInTheDocument();
    expect(screen.getByText('Cloud hosting')).toBeInTheDocument();
    expect(screen.queryByText('Client payment')).not.toBeInTheDocument();
  });
});
