import { fireEvent, render, screen } from '@testing-library/react';
import { WishlistView } from '../WishlistView';

const items = [
  { id: 'w1', name: 'Hoodie', price: 45 },
  { id: 'w2', name: 'Cap', price: 20 },
];

describe('WishlistView', () => {
  it('renders wishlist items with prices and count', () => {
    render(<WishlistView items={items} />);
    expect(screen.getByText('Hoodie')).toBeInTheDocument();
    expect(screen.getByText('$45.00')).toBeInTheDocument();
    expect(screen.getByText('2 items')).toBeInTheDocument();
  });

  it('fires onRemove with the item id', () => {
    const onRemove = jest.fn();
    render(<WishlistView items={items} onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Hoodie' }));
    expect(onRemove).toHaveBeenCalledWith('w1');
  });

  it('fires onAddToCart with the item id', () => {
    const onAddToCart = jest.fn();
    render(<WishlistView items={items} onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Move to cart' })[1]);
    expect(onAddToCart).toHaveBeenCalledWith('w2');
  });

  it('shows an empty state when no items exist', () => {
    render(<WishlistView items={[]} />);
    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
  });
});
