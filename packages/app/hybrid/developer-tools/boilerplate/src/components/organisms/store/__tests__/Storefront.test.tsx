import { render, screen } from '@testing-library/react';
import { Storefront } from '../Storefront';

const categories = [
  { id: 'c1', name: 'Home' },
  { id: 'c2', name: 'Tech' },
];

const products = [
  { id: 'p1', name: 'Lamp', price: 30 },
  { id: 'p2', name: 'Speaker', price: 55 },
];

describe('Storefront', () => {
  it('renders the hero title and subtitle', () => {
    render(
      <Storefront
        title="Welcome Store"
        subtitle="New season drops"
        categories={categories}
        products={products}
      />
    );
    expect(screen.getByText('Welcome Store')).toBeInTheDocument();
    expect(screen.getByText('New season drops')).toBeInTheDocument();
  });

  it('renders category buttons', () => {
    render(
      <Storefront
        title="Welcome Store"
        categories={categories}
        products={products}
      />
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tech')).toBeInTheDocument();
  });

  it('renders featured products with prices', () => {
    render(
      <Storefront
        title="Welcome Store"
        categories={categories}
        products={products}
      />
    );
    expect(screen.getByText('Lamp')).toBeInTheDocument();
    expect(screen.getByText('$55.00')).toBeInTheDocument();
  });
});
