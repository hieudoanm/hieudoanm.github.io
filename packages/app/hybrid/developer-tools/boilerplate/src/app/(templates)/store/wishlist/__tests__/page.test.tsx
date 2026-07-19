import { render, screen } from '@testing-library/react';
import WishlistPage from '@/app/(templates)/store/wishlist/page';

describe('WishlistPage', () => {
  it('renders the wishlist page', () => {
    render(<WishlistPage />);
    expect(screen.getByText('Wishlist (3)')).toBeInTheDocument();
  });
});
