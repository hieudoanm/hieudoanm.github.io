import { render, screen } from '@testing-library/react';
import ExpensesPage from '@/app/(templates)/finance/expenses/page';

describe('ExpensesPage', () => {
  it('renders the ExpensesPage', () => {
    render(<ExpensesPage />);
    expect(screen.getByText('1 of 4 approved')).toBeInTheDocument();
  });
});
