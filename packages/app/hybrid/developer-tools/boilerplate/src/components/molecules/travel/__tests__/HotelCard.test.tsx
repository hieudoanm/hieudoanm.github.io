import { render, screen } from '@testing-library/react';
import { HotelCard } from '../HotelCard';

describe('HotelCard', () => {
  it('renders name, location and price per night', () => {
    render(
      <HotelCard name="Riverside Inn" location="Hanoi" pricePerNight={65} />
    );
    expect(screen.getByText('Riverside Inn')).toBeInTheDocument();
    expect(screen.getByText('📍 Hanoi')).toBeInTheDocument();
    expect(screen.getByTestId('hotel-price')).toHaveTextContent(
      '$65.00 / night'
    );
  });

  it('shows rating badge when provided', () => {
    render(
      <HotelCard
        name="Riverside Inn"
        location="Hanoi"
        pricePerNight={65}
        rating={4.6}
      />
    );
    expect(screen.getByTestId('hotel-rating')).toHaveTextContent('4.6');
  });

  it('renders star rating when provided', () => {
    render(
      <HotelCard
        name="Riverside Inn"
        location="Hanoi"
        pricePerNight={65}
        stars={4}
      />
    );
    expect(screen.getByTestId('hotel-stars')).toHaveTextContent('★★★★☆');
  });

  it('hides rating and stars when not provided', () => {
    render(
      <HotelCard name="Riverside Inn" location="Hanoi" pricePerNight={65} />
    );
    expect(screen.queryByTestId('hotel-rating')).not.toBeInTheDocument();
    expect(screen.queryByTestId('hotel-stars')).not.toBeInTheDocument();
  });
});
