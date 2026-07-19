import { render, screen } from '@testing-library/react';
import { StockBadge } from '../StockBadge';

describe('StockBadge', () => {
  it('renders in-stock label with success class', () => {
    render(<StockBadge status="in-stock" />);
    const badge = screen.getByTestId('stock-badge');
    expect(badge).toHaveTextContent('In stock');
    expect(badge).toHaveClass('badge-success');
  });

  it('shows remaining quantity for low stock', () => {
    render(<StockBadge status="low-stock" quantity={4} />);
    expect(screen.getByTestId('stock-badge')).toHaveTextContent('4 left');
  });

  it('omits quantity when out of stock', () => {
    render(<StockBadge status="out-of-stock" quantity={0} />);
    const badge = screen.getByTestId('stock-badge');
    expect(badge).toHaveTextContent('Out of stock');
    expect(badge).not.toHaveTextContent('left');
    expect(badge).toHaveClass('badge-error');
  });
});
