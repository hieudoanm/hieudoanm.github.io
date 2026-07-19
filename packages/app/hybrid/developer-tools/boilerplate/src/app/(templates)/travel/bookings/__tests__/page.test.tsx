import { render, screen } from '@testing-library/react';
import BookingsPage from '@/app/(templates)/travel/bookings/page';

describe('BookingsPage', () => {
  it('renders the bookings page', () => {
    render(<BookingsPage />);
    expect(screen.getByText('4 bookings')).toBeInTheDocument();
  });
});
