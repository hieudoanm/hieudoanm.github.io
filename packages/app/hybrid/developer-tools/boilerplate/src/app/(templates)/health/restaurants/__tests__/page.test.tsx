import { render, screen } from '@testing-library/react';
import RestaurantListPage from '@/app/(templates)/health/restaurants/page';

describe('RestaurantListPage', () => {
  it('renders the RestaurantListPage', () => {
    render(<RestaurantListPage />);
    expect(screen.getByText('6 restaurants')).toBeInTheDocument();
  });
});
