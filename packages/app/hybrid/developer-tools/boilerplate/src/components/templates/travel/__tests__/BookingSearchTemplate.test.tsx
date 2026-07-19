import { fireEvent, render, screen } from '@testing-library/react';
import { BookingSearchTemplate } from '../BookingSearchTemplate';

describe('BookingSearchTemplate', () => {
  it('renders hotel results by default', () => {
    render(<BookingSearchTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Booking Search' })
    ).toBeInTheDocument();
    expect(screen.getByText('Find hotels and flights.')).toBeInTheDocument();
    expect(screen.getByLabelText('Search bookings')).toBeInTheDocument();
    expect(screen.getByText('4 results')).toBeInTheDocument();
    expect(screen.getByText('Hotel Sunset')).toBeInTheDocument();
    expect(screen.getByText('Hanoi')).toBeInTheDocument();
    expect(screen.getByText('$120/night')).toBeInTheDocument();
    expect(screen.getByText('4.5 rating')).toBeInTheDocument();
  });

  it('switches to flight results', () => {
    render(<BookingSearchTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Flights' }));
    expect(screen.getByText('3 results')).toBeInTheDocument();
    expect(screen.getByText('Vietnam Airlines')).toBeInTheDocument();
    expect(screen.getByText('Hanoi → Tokyo')).toBeInTheDocument();
    expect(screen.getByText('$520')).toBeInTheDocument();
    expect(screen.queryByText('Hotel Sunset')).not.toBeInTheDocument();
  });

  it('filters results and shows the empty state', () => {
    render(<BookingSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search bookings'), {
      target: { value: 'sunset' },
    });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByText('Hotel Sunset')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search bookings'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.getByText('No results for "zzz"')).toBeInTheDocument();
  });
});
