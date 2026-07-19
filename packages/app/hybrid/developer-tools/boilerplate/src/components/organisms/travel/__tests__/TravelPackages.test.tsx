import { fireEvent, render, screen } from '@testing-library/react';
import { TravelPackages } from '../TravelPackages';

const trips = [
  {
    id: 'tp1',
    name: 'Northern Lights',
    destination: 'Reykjavik',
    price: 2400,
    duration: '6 days',
    rating: 4.9,
    featured: true,
  },
  {
    id: 'tp2',
    name: 'Beach Escape',
    destination: 'Phuket',
    price: 900,
    duration: '5 days',
    rating: 4.5,
  },
];

describe('TravelPackages', () => {
  it('renders package names, destinations and prices', () => {
    render(<TravelPackages packages={trips} />);
    expect(screen.getByText('Northern Lights')).toBeInTheDocument();
    expect(screen.getByText('Reykjavik')).toBeInTheDocument();
    expect(screen.getByText('$2,400')).toBeInTheDocument();
    expect(screen.getByText('Beach Escape')).toBeInTheDocument();
  });

  it('marks the featured package', () => {
    render(<TravelPackages packages={trips} />);
    expect(screen.getByText('Best value')).toBeInTheDocument();
  });

  it('fires onSelect with the package id', () => {
    const onSelect = jest.fn();
    render(<TravelPackages packages={trips} onSelect={onSelect} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'View' })[1]);
    expect(onSelect).toHaveBeenCalledWith('tp2');
  });
});
