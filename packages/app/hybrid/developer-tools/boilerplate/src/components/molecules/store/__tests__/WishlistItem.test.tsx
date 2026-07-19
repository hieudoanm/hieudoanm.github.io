import { fireEvent, render, screen } from '@testing-library/react';
import { WishlistItem } from '../WishlistItem';

describe('WishlistItem', () => {
  it('renders name, price and added date', () => {
    render(<WishlistItem name="Watch" price={120} addedDate="Aug 1" />);
    expect(screen.getByText('Watch')).toBeInTheDocument();
    expect(screen.getByTestId('wishlist-price')).toHaveTextContent('$120.00');
    expect(screen.getByTestId('wishlist-price')).toHaveTextContent(
      'Added Aug 1'
    );
  });

  it('omits added date when not provided', () => {
    render(<WishlistItem name="Watch" price={120} />);
    expect(screen.getByTestId('wishlist-price')).not.toHaveTextContent('Added');
  });

  it('fires add-to-cart and remove callbacks', () => {
    const onAddToCart = jest.fn();
    const onRemove = jest.fn();
    render(
      <WishlistItem
        name="Watch"
        price={120}
        onAddToCart={onAddToCart}
        onRemove={onRemove}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    expect(onAddToCart).toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Remove Watch' }));
    expect(onRemove).toHaveBeenCalled();
  });
});
