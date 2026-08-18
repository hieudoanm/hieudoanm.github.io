import { render, screen } from '@testing-library/react';
import ProductsPage from '@/app/(templates)/crm/products/page';

describe('ProductsPage', () => {
  it('renders the ProductsPage', () => {
    render(<ProductsPage />);
    expect(screen.getByText('4 active products')).toBeInTheDocument();
  });
});
