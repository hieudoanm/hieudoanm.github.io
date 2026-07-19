import { render, screen } from '@testing-library/react';
import { TripSummary } from '../TripSummary';

describe('TripSummary', () => {
  it('renders destination, duration and traveler count', () => {
    render(<TripSummary destination="Japan" duration="7 days" travelers={2} />);
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('7 days')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('defaults to a single traveler', () => {
    render(<TripSummary destination="Japan" duration="7 days" />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('shows budget and start date when provided', () => {
    render(
      <TripSummary
        destination="Japan"
        duration="7 days"
        budget={1500}
        startDate="Oct 5"
      />
    );
    expect(screen.getByTestId('trip-budget')).toHaveTextContent('$1500.00');
    expect(screen.getByText('Oct 5')).toBeInTheDocument();
  });
});
