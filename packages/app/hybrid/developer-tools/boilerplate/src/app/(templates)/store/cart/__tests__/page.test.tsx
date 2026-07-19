import { render, screen } from '@testing-library/react';
import CartPage from '@/app/(templates)/store/cart/page';

describe('CartPage', () => {
  it('renders the cart', () => {
    render(<CartPage />);
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
  });
});
