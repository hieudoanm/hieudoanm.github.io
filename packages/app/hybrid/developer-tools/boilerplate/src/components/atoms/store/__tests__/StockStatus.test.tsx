import { render, screen } from '@testing-library/react';
import { StockStatus } from '../StockStatus';

describe('StockStatus', () => {
  it('renders the in-stock label', () => {
    render(<StockStatus status="in" />);
    expect(screen.getByTestId('stock-status')).toHaveTextContent('In stock');
    expect(screen.getByTestId('stock-status')).toHaveClass('badge-success');
  });

  it('renders the low-stock label with count', () => {
    render(<StockStatus status="low" count={5} />);
    expect(screen.getByTestId('stock-status')).toHaveTextContent(
      'Low stock · 5'
    );
  });

  it('renders the out-of-stock label without count', () => {
    render(<StockStatus status="out" count={3} />);
    expect(screen.getByTestId('stock-status')).toHaveTextContent(
      'Out of stock'
    );
    expect(screen.getByTestId('stock-status')).not.toHaveTextContent('3');
  });
});
