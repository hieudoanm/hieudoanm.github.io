import { render, screen } from '@testing-library/react';
import { AccountBalance } from '../AccountBalance';

describe('AccountBalance', () => {
  it('renders the account name and balance', () => {
    render(<AccountBalance accountName="Checking" balance={1200.5} />);
    expect(screen.getByText('Checking')).toBeInTheDocument();
    expect(screen.getByTestId('account-balance')).toHaveTextContent(
      '$1,200.50'
    );
  });

  it('applies the credit variant class', () => {
    const { container } = render(
      <AccountBalance accountName="Savings" balance={5000} variant="credit" />
    );
    expect(container.querySelector('.text-xl')).toHaveClass('text-success');
  });

  it('applies the debit variant class', () => {
    const { container } = render(
      <AccountBalance accountName="Card" balance={-80} variant="debit" />
    );
    expect(container.querySelector('.text-xl')).toHaveClass('text-error');
  });
});
