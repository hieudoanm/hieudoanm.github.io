import { render, screen } from '@testing-library/react';
import { BalanceLabel } from '../BalanceLabel';

describe('BalanceLabel', () => {
  it('renders the label and formatted balance', () => {
    render(<BalanceLabel label="Savings" balance={2500} />);
    expect(screen.getByText('Savings')).toBeInTheDocument();
    expect(screen.getByTestId('balance-label')).toHaveTextContent('$2,500.00');
  });

  it('uses the provided currency', () => {
    render(<BalanceLabel label="Checking" balance={100} currency="JPY" />);
    expect(screen.getByTestId('balance-label')).toHaveTextContent('¥100');
  });

  it('handles a zero balance', () => {
    render(<BalanceLabel label="Wallet" balance={0} />);
    expect(screen.getByTestId('balance-label')).toHaveTextContent('$0.00');
  });
});
