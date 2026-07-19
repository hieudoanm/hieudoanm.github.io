import { render, screen } from '@testing-library/react';
import { BookingCard } from '../BookingCard';

describe('BookingCard', () => {
  it('renders reference, title and date', () => {
    render(
      <BookingCard
        reference="BK-2026"
        title="Hotel · 3 nights"
        date="Aug 10-13"
        status="confirmed"
      />
    );
    expect(screen.getByText('BK-2026')).toBeInTheDocument();
    expect(screen.getByText('Hotel · 3 nights')).toBeInTheDocument();
    expect(screen.getByText('📅 Aug 10-13')).toBeInTheDocument();
  });

  it('maps confirmed status to success badge', () => {
    render(
      <BookingCard
        reference="BK-1"
        title="Flight"
        date="Aug 10"
        status="confirmed"
      />
    );
    expect(screen.getByTestId('booking-status')).toHaveTextContent('confirmed');
    expect(screen.getByTestId('booking-status')).toHaveClass('badge-success');
  });

  it('shows price and guest count when provided', () => {
    render(
      <BookingCard
        reference="BK-2"
        title="Resort"
        date="Sep 1"
        status="pending"
        price={420.5}
        guests={2}
      />
    );
    expect(screen.getByTestId('booking-price')).toHaveTextContent('$420.50');
    expect(screen.getByText('👥 2 guests')).toBeInTheDocument();
  });
});
