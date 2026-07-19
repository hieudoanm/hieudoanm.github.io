import { render, screen } from '@testing-library/react';
import { TransactionType } from '../TransactionType';

describe('TransactionType', () => {
  it('renders the income type with success class', () => {
    render(<TransactionType type="income" />);
    expect(screen.getByTestId('transaction-type')).toHaveTextContent('Income');
    expect(screen.getByTestId('transaction-type')).toHaveClass('badge-success');
  });

  it('renders the expense type with error class', () => {
    render(<TransactionType type="expense" />);
    expect(screen.getByTestId('transaction-type')).toHaveTextContent('Expense');
    expect(screen.getByTestId('transaction-type')).toHaveClass('badge-error');
  });

  it('renders the transfer type with info class', () => {
    render(<TransactionType type="transfer" />);
    expect(screen.getByTestId('transaction-type')).toHaveTextContent(
      'Transfer'
    );
    expect(screen.getByTestId('transaction-type')).toHaveClass('badge-info');
  });
});
