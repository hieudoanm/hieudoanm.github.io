import { render, screen } from '@testing-library/react';
import ListingsPage from '@/app/(templates)/travel/listings/page';

describe('ListingsPage', () => {
  it('renders the listings page', () => {
    render(<ListingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Property Listings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Browse homes for sale.')).toBeInTheDocument();
  });
});
