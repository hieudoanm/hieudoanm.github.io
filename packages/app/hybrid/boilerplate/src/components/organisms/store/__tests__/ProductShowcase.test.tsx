import { fireEvent, render, screen } from '@testing-library/react';
import { ProductShowcase } from '../ProductShowcase';

const product = {
  name: 'Aurora Lamp',
  brand: 'Lumina',
  price: 89.99,
  rating: 4,
  description: 'A warm ambient lamp for any room.',
  features: ['Dimmable', 'USB-C charging', 'Portable'],
};

describe('ProductShowcase', () => {
  it('renders product details and price', () => {
    render(<ProductShowcase product={product} />);
    expect(screen.getByText('Aurora Lamp')).toBeInTheDocument();
    expect(screen.getByText('Lumina')).toBeInTheDocument();
    expect(screen.getByText('$89.99')).toBeInTheDocument();
    expect(
      screen.getByText('A warm ambient lamp for any room.')
    ).toBeInTheDocument();
  });

  it('renders features and rating', () => {
    render(<ProductShowcase product={product} />);
    expect(screen.getByText('Dimmable')).toBeInTheDocument();
    expect(screen.getByText('Portable')).toBeInTheDocument();
    expect(screen.getByLabelText('4 stars')).toBeInTheDocument();
  });

  it('fires onAddToCart when the button is clicked', () => {
    const onAddToCart = jest.fn();
    render(<ProductShowcase product={product} onAddToCart={onAddToCart} />);
    fireEvent.click(screen.getByRole('button', { name: 'Add to cart' }));
    expect(onAddToCart).toHaveBeenCalled();
  });
});
