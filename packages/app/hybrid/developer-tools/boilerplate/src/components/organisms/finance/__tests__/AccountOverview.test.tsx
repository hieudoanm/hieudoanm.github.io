import { render, screen } from '@testing-library/react';
import { AccountOverview } from '../AccountOverview';

describe('AccountOverview', () => {
  it('renders balance, income, and expenses', () => {
    render(<AccountOverview balance={12000} income={4000} expenses={2800} />);
    expect(screen.getByTestId('balance')).toHaveTextContent('$12,000.00');
    expect(screen.getByTestId('income')).toHaveTextContent('$4,000.00');
    expect(screen.getByTestId('expenses')).toHaveTextContent('$2,800.00');
  });

  it('renders the account name and computed savings rate', () => {
    render(
      <AccountOverview
        balance={12000}
        income={4000}
        expenses={2800}
        accountName="Vacation fund"
        currency="EUR"
      />
    );
    expect(screen.getByText('Vacation fund')).toBeInTheDocument();
    expect(screen.getByText('30%')).toBeInTheDocument();
    expect(screen.getByTestId('balance')).toHaveTextContent('€12,000.00');
  });

  it('shows a zero savings rate when income is zero', () => {
    render(<AccountOverview balance={0} income={0} expenses={0} />);
    expect(screen.getByText('0%')).toBeInTheDocument();
  });
});
