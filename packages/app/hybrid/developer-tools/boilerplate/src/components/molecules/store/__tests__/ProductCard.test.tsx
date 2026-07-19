import { render, screen } from '@testing-library/react';
import { ProductCard } from '../ProductCard';

describe('ProductCard', () => {
  it('renders product name and formatted price', () => {
    render(<ProductCard name="Wireless Headphones" price={89.99} />);
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByTestId('product-price')).toHaveTextContent('$89.99');
  });

  it('renders the image label placeholder', () => {
    render(<ProductCard name="Keyboard" price={49} imageLabel="KB-101" />);
    expect(screen.getByText('KB-101')).toBeInTheDocument();
  });

  it('shows rating and review count when provided', () => {
    render(<ProductCard name="Mouse" price={20} rating={4.5} reviews={12} />);
    expect(screen.getByTestId('product-rating')).toHaveTextContent('4.5');
    expect(screen.getByTestId('product-rating')).toHaveTextContent(
      '12 reviews'
    );
  });

  it('hides rating when not provided', () => {
    render(<ProductCard name="Cable" price={9.5} />);
    expect(screen.queryByTestId('product-rating')).not.toBeInTheDocument();
  });

  it('renders an optional badge', () => {
    render(<ProductCard name="Shoes" price={60} badge="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });
});
