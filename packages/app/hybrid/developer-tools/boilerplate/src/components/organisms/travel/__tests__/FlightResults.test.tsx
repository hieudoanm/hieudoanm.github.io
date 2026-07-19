import { fireEvent, render, screen } from '@testing-library/react';
import { FlightResults } from '../FlightResults';

const flights = [
  {
    airline: 'SkyAir',
    from: 'SGN',
    to: 'NRT',
    price: 450,
    duration: '5h 20m',
    departure: '08:00',
    arrival: '13:20',
    stops: 0,
  },
  {
    airline: 'Nippon',
    from: 'SGN',
    to: 'NRT',
    price: 380,
    duration: '8h 10m',
    departure: '10:00',
    arrival: '18:10',
    stops: 1,
  },
];

describe('FlightResults', () => {
  it('renders flight airlines, route and prices', () => {
    render(<FlightResults flights={flights} />);
    expect(screen.getByText('SkyAir')).toBeInTheDocument();
    expect(screen.getAllByText('SGN → NRT').length).toBeGreaterThan(0);
    expect(screen.getByText('$450')).toBeInTheDocument();
    expect(screen.getByText('Nippon')).toBeInTheDocument();
  });

  it('renders stops information', () => {
    render(<FlightResults flights={flights} />);
    expect(screen.getByText('Nonstop')).toBeInTheDocument();
    expect(screen.getByText('1 stop(s)')).toBeInTheDocument();
  });

  it('fires onSelect with the flight index', () => {
    const onSelect = jest.fn();
    render(<FlightResults flights={flights} onSelect={onSelect} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Select' })[1]);
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it('shows an empty state when no flights exist', () => {
    render(<FlightResults flights={[]} />);
    expect(screen.getByText('No flights found')).toBeInTheDocument();
  });
});
