import { render, screen } from '@testing-library/react';
import { PriceLabel } from '../PriceLabel';

describe('PriceLabel', () => {
  it('formats the amount with the default currency', () => {
    render(<PriceLabel amount={12.5} />);
    expect(screen.getByTestId('price-label')).toHaveTextContent('$12.50');
  });

  it('supports a custom currency', () => {
    render(<PriceLabel amount={1000} currency="VND" />);
    expect(screen.getByTestId('price-label')).toHaveTextContent('₫1,000.00');
  });

  it('applies the strikethrough style', () => {
    render(<PriceLabel amount={20} strikethrough />);
    expect(screen.getByTestId('price-label')).toHaveClass('line-through');
  });
});
