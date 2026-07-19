import { render, screen } from '@testing-library/react';
import BalanceCard from '../BalanceCard';

describe('BalanceCard', () => {
  it('renders the total balance label', () => {
    render(<BalanceCard amount={12345.67} />);
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
  });

  it('formats and displays the amount in USD', () => {
    render(<BalanceCard amount={12345.67} />);
    expect(screen.getByText('$12,345.67')).toBeInTheDocument();
  });

  it('handles zero balance', () => {
    render(<BalanceCard amount={0} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('handles negative balance', () => {
    render(<BalanceCard amount={-500} />);
    expect(screen.getByText('-$500.00')).toBeInTheDocument();
  });
});
