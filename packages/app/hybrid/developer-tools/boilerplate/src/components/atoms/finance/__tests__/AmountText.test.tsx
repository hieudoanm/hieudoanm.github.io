import { render, screen } from '@testing-library/react';
import { AmountText } from '../AmountText';

describe('AmountText', () => {
  it('formats the amount with the given currency', () => {
    render(<AmountText amount={1234.5} currency="USD" />);
    expect(screen.getByTestId('amount-text')).toHaveTextContent('$1,234.50');
  });

  it('defaults to USD when no currency is provided', () => {
    render(<AmountText amount={50} />);
    expect(screen.getByTestId('amount-text')).toHaveTextContent('$50.00');
  });

  it('formats a custom currency code', () => {
    render(<AmountText amount={100} currency="EUR" />);
    expect(screen.getByTestId('amount-text')).toHaveTextContent('€100.00');
  });

  it('handles negative amounts', () => {
    render(<AmountText amount={-25} />);
    expect(screen.getByTestId('amount-text')).toHaveTextContent('-$25.00');
  });
});
