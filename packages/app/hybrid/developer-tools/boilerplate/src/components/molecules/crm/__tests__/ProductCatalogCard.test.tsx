import { render, screen } from '@testing-library/react';
import { ProductCatalogCard } from '../ProductCatalogCard';

describe('ProductCatalogCard', () => {
  it('renders name, sku, category and price', () => {
    render(
      <ProductCatalogCard
        name="Wireless Mouse"
        price={25}
        sku="MOUSE-1"
        category="Peripherals"
      />
    );
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
    expect(screen.getByText('MOUSE-1')).toBeInTheDocument();
    expect(screen.getByText('Peripherals')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
  });

  it('shows in-stock badge when stock is above zero', () => {
    render(<ProductCatalogCard name="M" price={10} sku="S" stock={12} />);
    expect(screen.getByText('In stock: 12')).toHaveClass('badge-success');
  });

  it('shows out-of-stock badge when stock is zero', () => {
    render(<ProductCatalogCard name="M" price={10} sku="S" stock={0} />);
    expect(screen.getByText('Out of stock')).toHaveClass('badge-error');
  });
});
