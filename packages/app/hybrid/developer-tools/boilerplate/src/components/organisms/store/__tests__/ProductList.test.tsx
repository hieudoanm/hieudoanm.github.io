import { fireEvent, render, screen } from '@testing-library/react';
import { ProductList } from '../ProductList';

const products = [
  { id: 'pl1', name: 'Mug', price: 12.5, rating: 4, badge: 'Bestseller' },
  { id: 'pl2', name: 'Tote', price: 18, rating: 5 },
];

describe('ProductList', () => {
  it('renders product names, prices and ratings', () => {
    render(<ProductList products={products} />);
    expect(screen.getByText('Mug')).toBeInTheDocument();
    expect(screen.getByText('$12.50')).toBeInTheDocument();
    expect(screen.getByText('Tote')).toBeInTheDocument();
    expect(screen.getByText('$18.00')).toBeInTheDocument();
  });

  it('renders product badges when provided', () => {
    render(<ProductList products={products} />);
    expect(screen.getByText('Bestseller')).toBeInTheDocument();
  });

  it('fires onAddToCart with the product id', () => {
    const onAddToCart = jest.fn();
    render(<ProductList products={products} onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Add' })[0]);
    expect(onAddToCart).toHaveBeenCalledWith('pl1');
  });

  it('shows an empty state when no products exist', () => {
    render(<ProductList products={[]} />);
    expect(screen.getByText('No products found')).toBeInTheDocument();
  });
});
