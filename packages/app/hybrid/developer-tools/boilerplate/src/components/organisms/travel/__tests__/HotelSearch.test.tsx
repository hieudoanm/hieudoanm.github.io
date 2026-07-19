import { fireEvent, render, screen } from '@testing-library/react';
import { HotelSearch } from '../HotelSearch';

const hotels = [
  {
    id: 'h1',
    name: 'Harbor Inn',
    location: 'Da Nang',
    price: 85,
    rating: 4.5,
    amenities: ['Pool', 'WiFi'],
  },
];

describe('HotelSearch', () => {
  it('renders the search form', () => {
    render(<HotelSearch hotels={hotels} />);
    expect(screen.getByLabelText('Hotel destination')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('renders hotel cards with amenities', () => {
    render(<HotelSearch hotels={hotels} />);
    expect(screen.getByText('Harbor Inn')).toBeInTheDocument();
    expect(screen.getByText('Da Nang')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('$85')).toBeInTheDocument();
  });

  it('fires onSelect with the hotel id', () => {
    const onSelect = jest.fn();
    render(<HotelSearch hotels={hotels} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Book' }));
    expect(onSelect).toHaveBeenCalledWith('h1');
  });
});
