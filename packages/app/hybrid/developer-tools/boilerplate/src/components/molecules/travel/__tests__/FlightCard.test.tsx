import { render, screen } from '@testing-library/react';
import { FlightCard } from '../FlightCard';

describe('FlightCard', () => {
  it('renders airline, airports and times', () => {
    render(
      <FlightCard
        airline="Vietnam Airlines"
        from="SGN"
        to="HAN"
        departureTime="08:00"
        arrivalTime="10:15"
        price={89}
      />
    );
    expect(screen.getByText('Vietnam Airlines')).toBeInTheDocument();
    expect(screen.getByText('08:00')).toBeInTheDocument();
    expect(screen.getByText('10:15')).toBeInTheDocument();
    expect(screen.getByText('SGN')).toBeInTheDocument();
    expect(screen.getByText('HAN')).toBeInTheDocument();
  });

  it('renders formatted price', () => {
    render(
      <FlightCard
        airline="Vietnam Airlines"
        from="SGN"
        to="HAN"
        departureTime="08:00"
        arrivalTime="10:15"
        price={89.5}
      />
    );
    expect(screen.getByTestId('flight-price')).toHaveTextContent('$89.50');
  });

  it('labels direct flights', () => {
    render(
      <FlightCard
        airline="Vietnam Airlines"
        from="SGN"
        to="HAN"
        departureTime="08:00"
        arrivalTime="10:15"
        price={89}
      />
    );
    expect(screen.getByText('Direct')).toBeInTheDocument();
  });

  it('shows stops count for connecting flights', () => {
    render(
      <FlightCard
        airline="Vietnam Airlines"
        from="SGN"
        to="NRT"
        departureTime="08:00"
        arrivalTime="18:00"
        price={300}
        stops={1}
        duration="3h 5m"
      />
    );
    expect(screen.getByText('1 stop')).toBeInTheDocument();
    expect(screen.getByText('3h 5m')).toBeInTheDocument();
  });
});
