import { fireEvent, render, screen } from '@testing-library/react';
import { HotelDetailTemplate } from '../HotelDetailTemplate';

describe('HotelDetailTemplate', () => {
  it('renders hotel details with amenities', () => {
    render(<HotelDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Hotel' })).toBeInTheDocument();
    expect(screen.getByText('Hotel details.')).toBeInTheDocument();
    expect(screen.getByText('Hotel Sunset')).toBeInTheDocument();
    expect(screen.getByText('Hanoi, Vietnam')).toBeInTheDocument();
    expect(screen.getByText('4.6 rating')).toBeInTheDocument();
    expect(screen.getByText('$120/night')).toBeInTheDocument();
    expect(screen.getByText('Free WiFi')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Book' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Favorite' })
    ).toBeInTheDocument();
  });

  it('toggles the book state', () => {
    render(<HotelDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Book' }));
    expect(screen.getByText('Booked')).toHaveClass('badge-success');
    fireEvent.click(screen.getByRole('button', { name: 'Book' }));
    expect(screen.queryByText('Booked')).not.toBeInTheDocument();
  });

  it('toggles the favorite state', () => {
    render(<HotelDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Favorite' }));
    expect(screen.getByText('Favorited')).toHaveClass('badge-error');
    fireEvent.click(screen.getByRole('button', { name: 'Favorite' }));
    expect(screen.queryByText('Favorited')).not.toBeInTheDocument();
  });
});
