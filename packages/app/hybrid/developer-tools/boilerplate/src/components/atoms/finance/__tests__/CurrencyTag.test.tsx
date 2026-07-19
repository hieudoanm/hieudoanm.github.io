import { render, screen } from '@testing-library/react';
import { CurrencyTag } from '../CurrencyTag';

describe('CurrencyTag', () => {
  it('renders the currency code', () => {
    render(<CurrencyTag code="USD" />);
    expect(screen.getByTestId('currency-tag')).toHaveTextContent('USD');
  });

  it('applies badge classes', () => {
    render(<CurrencyTag code="EUR" />);
    expect(screen.getByTestId('currency-tag')).toHaveClass('badge');
    expect(screen.getByTestId('currency-tag')).toHaveClass('badge-outline');
  });

  it('formats the amount when provided', () => {
    render(<CurrencyTag code="USD" amount={99.99} />);
    expect(screen.getByTestId('currency-tag')).toHaveTextContent('$99.99');
  });
});
