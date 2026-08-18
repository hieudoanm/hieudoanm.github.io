import { render, screen } from '@testing-library/react';
import { CartBadge } from '../CartBadge';

describe('CartBadge', () => {
  it('renders the item count', () => {
    render(<CartBadge count={3} />);
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('3');
  });

  it('renders a zero count', () => {
    render(<CartBadge count={0} />);
    expect(screen.getByTestId('cart-badge')).toHaveTextContent('0');
  });

  it('uses a custom aria-label', () => {
    render(<CartBadge count={2} label="Shopping cart" />);
    expect(
      screen.getByRole('button', { name: 'Shopping cart' })
    ).toBeInTheDocument();
  });
});
