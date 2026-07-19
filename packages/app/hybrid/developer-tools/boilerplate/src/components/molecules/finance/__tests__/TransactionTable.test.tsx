import { render, screen } from '@testing-library/react';
import { TransactionTable } from '../TransactionTable';

const transactions = [
  {
    id: '1',
    date: 'Aug 8',
    description: 'Groceries',
    category: 'Food',
    amount: 45.2,
    type: 'expense' as const,
  },
  {
    id: '2',
    date: 'Aug 7',
    description: 'Salary',
    category: 'Work',
    amount: 2500,
    type: 'income' as const,
  },
];

describe('TransactionTable', () => {
  it('renders transaction rows with headers', () => {
    render(<TransactionTable transactions={transactions} />);
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Groceries')).toBeInTheDocument();
    expect(screen.getByText('Salary')).toBeInTheDocument();
  });

  it('formats expense as negative', () => {
    render(<TransactionTable transactions={transactions} />);
    expect(screen.getByText('−$45.20')).toBeInTheDocument();
  });

  it('formats income as positive', () => {
    render(<TransactionTable transactions={transactions} />);
    expect(screen.getByText('+$2,500.00')).toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<TransactionTable transactions={[]} />);
    expect(screen.getByText('No transactions')).toBeInTheDocument();
  });
});
