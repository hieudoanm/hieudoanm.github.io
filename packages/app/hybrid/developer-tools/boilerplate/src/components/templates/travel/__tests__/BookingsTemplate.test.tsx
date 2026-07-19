import { fireEvent, render, screen } from '@testing-library/react';
import { BookingsTemplate } from '../BookingsTemplate';

describe('BookingsTemplate', () => {
  it('renders bookings with status badges', () => {
    render(<BookingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Bookings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your reservations.')).toBeInTheDocument();
    expect(screen.getByText('4 bookings')).toBeInTheDocument();
    expect(screen.getByText('Hotel Sunset')).toBeInTheDocument();
    expect(screen.getByText('Aug 20, 2026')).toBeInTheDocument();
    expect(screen.getByText('Flight HN-TYO')).toBeInTheDocument();
    expect(screen.getByText('Hanoi → Tokyo')).toBeInTheDocument();
    expect(screen.getAllByText('Confirmed')).toHaveLength(2);
    expect(screen.getAllByText('Pending')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(2);
  });

  it('cancels a pending booking', () => {
    render(<BookingsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Cancel' })[0]);
    expect(screen.getByText('Cancelled')).toHaveClass('badge-error');
    expect(screen.getAllByText('Pending')).toHaveLength(1);
    expect(screen.getAllByText('Confirmed')).toHaveLength(2);
    expect(screen.getByText('4 bookings')).toBeInTheDocument();
  });
});
