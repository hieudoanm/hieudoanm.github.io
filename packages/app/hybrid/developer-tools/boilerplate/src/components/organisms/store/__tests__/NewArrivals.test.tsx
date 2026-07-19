import { render, screen } from '@testing-library/react';
import { NewArrivals } from '../NewArrivals';

const products = [
  { id: 'n1', name: 'Blazer', price: 120, category: 'Apparel' },
  { id: 'n2', name: 'Runner', price: 90, category: 'Shoes' },
];

describe('NewArrivals', () => {
  it('renders product names, categories and prices', () => {
    render(<NewArrivals products={products} />);
    expect(screen.getByText('Blazer')).toBeInTheDocument();
    expect(screen.getByText('Apparel')).toBeInTheDocument();
    expect(screen.getByText('$120.00')).toBeInTheDocument();
    expect(screen.getByText('Runner')).toBeInTheDocument();
  });

  it('marks every product with a New badge', () => {
    render(<NewArrivals products={products} />);
    expect(screen.getAllByText('New').length).toBe(2);
  });
});
