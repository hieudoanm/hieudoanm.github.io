import { render, screen } from '@testing-library/react';
import { TripPlanner } from '../TripPlanner';

const activities = [
  { id: 'a1', name: 'Snorkeling', date: 'Aug 10', confirmed: true },
  { id: 'a2', name: 'City tour', date: 'Aug 11' },
];

describe('TripPlanner', () => {
  it('renders trip details and stats', () => {
    render(
      <TripPlanner
        trip={{
          destination: 'Bali',
          dates: 'Aug 10 - Aug 14',
          travelers: 2,
          budget: 2000,
        }}
        activities={activities}
      />
    );
    expect(screen.getByText('Bali')).toBeInTheDocument();
    expect(screen.getByText('Aug 10 - Aug 14')).toBeInTheDocument();
    expect(screen.getByText(/2 travelers/)).toBeInTheDocument();
    expect(screen.getByText(/budget \$2,000/)).toBeInTheDocument();
  });

  it('renders activities with confirmation status', () => {
    render(
      <TripPlanner
        trip={{
          destination: 'Bali',
          dates: 'Aug 10 - Aug 14',
          travelers: 2,
          budget: 2000,
        }}
        activities={activities}
      />
    );
    expect(screen.getByText('Snorkeling')).toBeInTheDocument();
    expect(screen.getAllByText('Confirmed').length).toBeGreaterThan(0);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('shows an empty state when no activities exist', () => {
    render(
      <TripPlanner
        trip={{
          destination: 'Bali',
          dates: 'Aug 10 - Aug 14',
          travelers: 2,
          budget: 2000,
        }}
        activities={[]}
      />
    );
    expect(screen.getByText('No activities planned yet')).toBeInTheDocument();
  });
});
