import { fireEvent, render, screen } from '@testing-library/react';
import { StoreFrontTemplate } from '../StoreFrontTemplate';

describe('StoreFrontTemplate', () => {
  it('renders hero, products, and cart count', () => {
    render(<StoreFrontTemplate cartCount={5} />);
    expect(screen.getByText('Workspace essentials')).toBeInTheDocument();
    expect(screen.getAllByText('Ergonomic Chair').length).toBe(2);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders original price when present', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('$429').length).toBeGreaterThan(0);
  });

  it('renders product badges', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('Sale').length).toBeGreaterThan(0);
  });

  it('filters products by category', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getAllByText('Ergonomic Chair').length).toBe(2);
    fireEvent.click(screen.getByRole('button', { name: 'Audio' }));
    expect(screen.getByText('Studio Headphones')).toBeInTheDocument();
    expect(screen.getAllByText('Ergonomic Chair').length).toBe(1);
  });

  it('switches back to all products', () => {
    render(<StoreFrontTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Electronics' }));
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getAllByText('Ergonomic Chair').length).toBe(2);
  });

  it('highlights active category button', () => {
    render(<StoreFrontTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Furniture' }));
    expect(screen.getByRole('button', { name: 'Furniture' })).toHaveClass(
      'btn-primary'
    );
  });

  it('shows deals section with on-sale products only', () => {
    render(<StoreFrontTemplate />);
    expect(screen.getByText('On sale now')).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /Canvas Backpack/ }).length
    ).toBeGreaterThan(0);
  });

  it('links products to detail pages', () => {
    render(<StoreFrontTemplate />);
    expect(
      screen.getAllByRole('link', { name: /Ergonomic Chair/ })[0]
    ).toHaveAttribute('href', '/store/1');
  });

  it('omits cart badge when count is zero', () => {
    render(<StoreFrontTemplate cartCount={0} />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});
