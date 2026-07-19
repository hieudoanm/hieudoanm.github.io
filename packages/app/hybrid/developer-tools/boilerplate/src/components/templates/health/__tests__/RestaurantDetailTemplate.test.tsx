import { fireEvent, render, screen } from '@testing-library/react';
import { RestaurantDetailTemplate } from '../RestaurantDetailTemplate';

describe('RestaurantDetailTemplate', () => {
  it('renders the restaurant details', () => {
    render(<RestaurantDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Restaurant' })
    ).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.getByText('4.5 rating')).toBeInTheDocument();
    expect(screen.getByText('12 Harbor Street')).toBeInTheDocument();
    expect(screen.getByText('Mon-Fri: 11:00 - 22:00')).toBeInTheDocument();
  });

  it('books the table', () => {
    render(<RestaurantDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Book table' }));
    expect(screen.getByText('Booked')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Book table' })
    ).not.toBeInTheDocument();
  });

  it('favorites the restaurant', () => {
    render(<RestaurantDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Favorite' }));
    expect(screen.getByText('Favorited')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Favorite' })
    ).not.toBeInTheDocument();
  });
});
