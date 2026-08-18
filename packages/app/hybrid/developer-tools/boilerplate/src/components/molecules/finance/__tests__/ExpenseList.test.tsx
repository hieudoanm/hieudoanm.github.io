import { render, screen } from '@testing-library/react';
import { ExpenseList } from '../ExpenseList';

const expenses = [
  { id: '1', title: 'Coffee', amount: 3.5, category: 'Food', date: 'Aug 8' },
  { id: '2', title: 'Taxi', amount: 12, category: 'Transport', date: 'Aug 8' },
  { id: '3', title: 'Movie', amount: 9.99, date: 'Aug 7' },
];

describe('ExpenseList', () => {
  it('renders expense titles and amounts', () => {
    render(<ExpenseList expenses={expenses} />);
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('−$3.50')).toBeInTheDocument();
    expect(screen.getByText('Taxi')).toBeInTheDocument();
    expect(screen.getByText('−$12.00')).toBeInTheDocument();
  });

  it('shows category and date for an expense', () => {
    render(<ExpenseList expenses={expenses} />);
    expect(screen.getByText('Food · Aug 8')).toBeInTheDocument();
  });

  it('limits the number of rendered items', () => {
    render(<ExpenseList expenses={expenses} limit={1} />);
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.queryByText('Taxi')).not.toBeInTheDocument();
  });

  it('renders empty state', () => {
    render(<ExpenseList expenses={[]} />);
    expect(screen.getByText('No expenses yet')).toBeInTheDocument();
  });
});
