import { render, screen } from '@testing-library/react';
import { SalesTrend } from '../SalesTrend';

describe('SalesTrend', () => {
  it('renders a positive trend with an up arrow', () => {
    render(<SalesTrend value={12} />);
    const trend = screen.getByTestId('sales-trend');
    expect(trend).toHaveTextContent('▲');
    expect(trend).toHaveTextContent('+12%');
    expect(trend).toHaveClass('text-success');
  });

  it('renders a negative trend with a down arrow', () => {
    render(<SalesTrend value={-3} />);
    const trend = screen.getByTestId('sales-trend');
    expect(trend).toHaveTextContent('▼');
    expect(trend).toHaveTextContent('-3%');
    expect(trend).toHaveClass('text-error');
  });

  it('renders a neutral dash for zero', () => {
    render(<SalesTrend value={0} />);
    expect(screen.getByTestId('sales-trend')).toHaveTextContent('—');
  });

  it('renders a custom suffix', () => {
    render(<SalesTrend value={5} suffix=" pts" />);
    expect(screen.getByTestId('sales-trend')).toHaveTextContent('+5 pts');
  });
});
