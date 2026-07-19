import { render, screen } from '@testing-library/react';
import { BalanceCard } from '../BalanceCard';

describe('BalanceCard', () => {
  it('renders title, balance and label', () => {
    render(
      <BalanceCard title="Savings" balance={1234.5} label="Total savings" />
    );
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByTestId('balance-value')).toHaveTextContent('$1,234.50');
    expect(screen.getByText('Total savings')).toBeInTheDocument();
  });

  it('uses default title and label', () => {
    render(<BalanceCard balance={100} />);
    expect(screen.getByText('Total Balance')).toBeInTheDocument();
    expect(screen.getByText('Available balance')).toBeInTheDocument();
  });

  it('renders positive trend as success badge', () => {
    render(<BalanceCard balance={100} trend={3.25} />);
    const badge = screen.getByTestId('balance-trend');
    expect(badge).toHaveTextContent('▲ 3.25%');
    expect(badge).toHaveClass('badge-success');
  });

  it('renders negative trend as error badge', () => {
    render(<BalanceCard balance={100} trend={-1.5} />);
    const badge = screen.getByTestId('balance-trend');
    expect(badge).toHaveTextContent('▼ 1.50%');
    expect(badge).toHaveClass('badge-error');
  });
});
