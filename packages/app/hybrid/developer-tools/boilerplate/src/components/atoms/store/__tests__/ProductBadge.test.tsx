import { render, screen } from '@testing-library/react';
import { ProductBadge } from '../ProductBadge';

describe('ProductBadge', () => {
  it('renders the label', () => {
    render(<ProductBadge label="New" />);
    expect(screen.getByTestId('product-badge')).toHaveTextContent('New');
  });

  it('defaults to the primary variant', () => {
    render(<ProductBadge label="Sale" />);
    expect(screen.getByTestId('product-badge')).toHaveClass('badge-primary');
  });

  it('applies a custom variant class', () => {
    render(<ProductBadge label="Bestseller" variant="accent" />);
    expect(screen.getByTestId('product-badge')).toHaveClass('badge-accent');
  });
});
