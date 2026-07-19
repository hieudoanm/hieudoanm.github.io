import { render, screen } from '@testing-library/react';
import { RevenueBadge } from '../RevenueBadge';

describe('RevenueBadge', () => {
  it('renders a compact formatted value', () => {
    render(<RevenueBadge value={1200000} />);
    expect(screen.getByTestId('revenue-badge')).toHaveTextContent('$1.2M');
  });

  it('renders a custom prefix', () => {
    render(<RevenueBadge value={50000} prefix="€" />);
    expect(screen.getByTestId('revenue-badge')).toHaveTextContent('€50K');
  });

  it('applies the variant class', () => {
    render(<RevenueBadge value={50000} variant="success" />);
    expect(screen.getByTestId('revenue-badge')).toHaveClass('badge-success');
  });

  it('handles a zero value', () => {
    render(<RevenueBadge value={0} />);
    expect(screen.getByTestId('revenue-badge')).toHaveTextContent('$0');
  });
});
