import { render, screen } from '@testing-library/react';
import { StoreCard } from '../StoreCard';

describe('StoreCard', () => {
  it('renders store name and logo initial', () => {
    render(<StoreCard name="Nike" logoLabel="Nike" />);
    expect(screen.getByText('Nike')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
  });

  it('shows rating and review count when provided', () => {
    render(<StoreCard name="Nike" rating={4.3} reviewCount={120} />);
    expect(screen.getByTestId('store-rating')).toHaveTextContent('4.3');
    expect(screen.getByTestId('store-rating')).toHaveTextContent('120 reviews');
  });

  it('shows category and delivery time when provided', () => {
    render(
      <StoreCard name="Nike" category="Footwear" deliveryTime="30-40 min" />
    );
    expect(screen.getByText('Footwear')).toBeInTheDocument();
    expect(screen.getByText('Delivery 30-40 min')).toBeInTheDocument();
  });
});
