import { fireEvent, render, screen } from '@testing-library/react';
import { WishlistTemplate } from '../WishlistTemplate';

describe('WishlistTemplate', () => {
  it('renders wishlist products and count', () => {
    render(<WishlistTemplate />);
    expect(screen.getByText('Wishlist (3)')).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('Studio Headphones')).toBeInTheDocument();
    expect(screen.getByText('$159')).toBeInTheDocument();
    expect(screen.getByText('Audio')).toBeInTheDocument();
  });

  it('moves a product to cart and shows confirmation', () => {
    render(<WishlistTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Move to cart' })[0]);
    expect(screen.queryByText('Ergonomic Chair')).not.toBeInTheDocument();
    expect(screen.getByText('Wishlist (2)')).toBeInTheDocument();
    expect(
      screen.getByText('Added Ergonomic Chair to your cart')
    ).toBeInTheDocument();
  });

  it('removes a product with the X button', () => {
    render(<WishlistTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Studio Headphones' })
    );
    expect(screen.queryByText('Studio Headphones')).not.toBeInTheDocument();
    expect(screen.getByText('Wishlist (2)')).toBeInTheDocument();
    expect(screen.queryByText(/Added .* to your cart/)).not.toBeInTheDocument();
  });

  it('shows empty state when all products are removed', () => {
    render(<WishlistTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Ergonomic Chair' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Mechanical Keyboard' })
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Studio Headphones' })
    );
    expect(screen.getByText('Your wishlist is empty')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse store' })).toHaveAttribute(
      'href',
      '/store'
    );
  });
});
