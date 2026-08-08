import { render, screen } from '@testing-library/react';
import TransactionsPage from '@/app/(templates)/finance/transactions/page';

describe('TransactionsPage', () => {
  it('renders the TransactionsPage', () => {
    render(<TransactionsPage />);
    expect(screen.getByText('$3,041')).toBeInTheDocument();
  });
});
