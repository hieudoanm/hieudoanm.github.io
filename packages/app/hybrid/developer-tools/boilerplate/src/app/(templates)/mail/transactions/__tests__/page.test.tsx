import { render, screen } from '@testing-library/react';
import TransactionsPage from '@/app/(templates)/mail/transactions/page';

describe('TransactionsPage', () => {
  it('renders the TransactionsPage', () => {
    render(<TransactionsPage />);
    expect(
      screen.getByRole('heading', { name: 'Transactions' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 transactions')).toBeInTheDocument();
  });
});
