import { render, screen } from '@testing-library/react';
import { TransactionHistory } from '../TransactionHistory';

const transactions = [
  {
    id: '1',
    date: '2026-08-01',
    description: 'Salary',
    category: 'Income',
    amount: 3200,
  },
  {
    id: '2',
    date: '2026-08-02',
    description: 'Coffee shop',
    category: 'Food',
    amount: -6.5,
  },
];

describe('TransactionHistory', () => {
  it('renders each transaction row', () => {
    render(<TransactionHistory transactions={transactions} />);
    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Coffee shop')).toBeInTheDocument();
    expect(screen.getByText('Income')).toBeInTheDocument();
    expect(screen.getByText('+$3,200.00')).toBeInTheDocument();
    expect(screen.getByText('-$6.50')).toBeInTheDocument();
  });

  it('renders the default title', () => {
    render(<TransactionHistory transactions={transactions} />);
    expect(screen.getByText('Recent transactions')).toBeInTheDocument();
  });

  it('renders an empty state when there are no transactions', () => {
    render(<TransactionHistory transactions={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No transactions yet.'
    );
  });
});
