import { render, screen } from '@testing-library/react';
import TransactionItem from '../TransactionItem';
import type { Transaction } from '@/types';

const mockIncome: Transaction = {
  id: '1',
  accountId: '1',
  title: 'Salary Deposit',
  category: 'Income',
  amount: 4500.0,
  currency: 'USD',
  date: '2026-07-21T09:00:00',
  type: 'income',
};

const mockExpense: Transaction = {
  id: '2',
  accountId: '1',
  title: 'Grocery Store',
  category: 'Food & Drink',
  amount: -85.42,
  currency: 'USD',
  date: '2026-07-22T10:30:00',
  type: 'expense',
};

describe('TransactionItem', () => {
  it('renders transaction title', () => {
    render(<TransactionItem transaction={mockIncome} />);
    expect(screen.getByText('Salary Deposit')).toBeInTheDocument();
  });

  it('renders category', () => {
    render(<TransactionItem transaction={mockIncome} />);
    expect(screen.getByText('Income')).toBeInTheDocument();
  });

  it('renders positive amount with + prefix', () => {
    render(<TransactionItem transaction={mockIncome} />);
    expect(screen.getByText('+$4,500.00')).toBeInTheDocument();
  });

  it('renders negative amount without + prefix', () => {
    render(<TransactionItem transaction={mockExpense} />);
    expect(screen.getByText('-$85.42')).toBeInTheDocument();
  });

  it('renders date when showDate is true', () => {
    render(<TransactionItem transaction={mockIncome} showDate />);
    expect(screen.getAllByText(/Yesterday|ago/).length).toBeGreaterThanOrEqual(
      1
    );
  });

  it('does not render date when showDate is false', () => {
    render(<TransactionItem transaction={mockIncome} />);
    expect(screen.queryByText(/Yesterday/)).not.toBeInTheDocument();
  });
});
