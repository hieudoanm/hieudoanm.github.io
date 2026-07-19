import { render, screen } from '@testing-library/react';
import { UnitPrice } from '../UnitPrice';

describe('UnitPrice', () => {
  it('renders the per-unit price', () => {
    render(<UnitPrice amount={2.5} />);
    expect(screen.getByTestId('unit-price')).toHaveTextContent('$2.50 / unit');
  });

  it('supports a custom currency', () => {
    render(<UnitPrice amount={10} currency="EUR" />);
    expect(screen.getByTestId('unit-price')).toHaveTextContent('€10.00 / unit');
  });

  it('supports a custom per label', () => {
    render(<UnitPrice amount={2.5} per="100g" />);
    expect(screen.getByTestId('unit-price')).toHaveTextContent('/ 100g');
  });
});
