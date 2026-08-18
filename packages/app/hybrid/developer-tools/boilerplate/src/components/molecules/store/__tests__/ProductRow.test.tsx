import { render, screen } from '@testing-library/react';
import { ProductRow } from '../ProductRow';

describe('ProductRow', () => {
  it('renders name, price and in-stock badge by default', () => {
    render(<ProductRow name="T-shirt" price={19.99} />);
    expect(screen.getByText('T-shirt')).toBeInTheDocument();
    expect(screen.getByTestId('product-row-price')).toHaveTextContent('$19.99');
    expect(screen.getByTestId('product-row-stock')).toHaveTextContent(
      'In stock'
    );
  });

  it('shows sku and category in meta', () => {
    render(
      <ProductRow name="T-shirt" price={20} sku="TS-100" category="Apparel" />
    );
    expect(screen.getByTestId('product-row-meta')).toHaveTextContent(
      'TS-100 · Apparel'
    );
  });

  it('marks out-of-stock products', () => {
    render(<ProductRow name="Socks" price={5} inStock={false} />);
    const badge = screen.getByTestId('product-row-stock');
    expect(badge).toHaveTextContent('Out of stock');
    expect(badge).toHaveClass('badge-error');
  });

  it('falls back to "No sku" when sku and category are missing', () => {
    render(<ProductRow name="Cap" price={12} />);
    expect(screen.getByTestId('product-row-meta')).toHaveTextContent('No sku');
  });
});
