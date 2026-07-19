import { render, screen } from '@testing-library/react';
import RestaurantDetailPage from '@/app/(templates)/health/restaurant/page';

describe('RestaurantDetailPage', () => {
  it('renders the RestaurantDetailPage', () => {
    render(<RestaurantDetailPage />);
    expect(screen.getByText('4.5 rating')).toBeInTheDocument();
  });
});
