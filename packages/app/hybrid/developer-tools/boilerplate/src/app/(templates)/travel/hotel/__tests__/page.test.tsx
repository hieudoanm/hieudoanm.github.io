import { render, screen } from '@testing-library/react';
import HotelPage from '@/app/(templates)/travel/hotel/page';

describe('HotelPage', () => {
  it('renders the hotel detail page', () => {
    render(<HotelPage />);
    expect(screen.getByText('4.6 rating')).toBeInTheDocument();
  });
});
