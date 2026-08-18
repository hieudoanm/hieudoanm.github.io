import { render, screen } from '@testing-library/react';
import FoodDeliveryPage from '@/app/(templates)/health/delivery/page';

describe('FoodDeliveryPage', () => {
  it('renders the FoodDeliveryPage', () => {
    render(<FoodDeliveryPage />);
    expect(screen.getByText('5 restaurants')).toBeInTheDocument();
  });
});
