import { render, screen } from '@testing-library/react';
import { PricePerNight } from '../PricePerNight';

describe('PricePerNight', () => {
  it('renders the amount with the default currency', () => {
    render(<PricePerNight amount={120} />);
    expect(screen.getByTestId('price-per-night')).toHaveTextContent('$120.00');
    expect(screen.getByTestId('price-per-night')).toHaveTextContent('/ night');
  });

  it('supports a custom currency', () => {
    render(<PricePerNight amount={1500000} currency="VND" />);
    expect(screen.getByTestId('price-per-night')).toHaveTextContent(
      '₫1,500,000.00'
    );
  });

  it('formats the amount with two decimals', () => {
    render(<PricePerNight amount={99.5} />);
    expect(screen.getByTestId('price-per-night')).toHaveTextContent('$99.50');
  });
});
