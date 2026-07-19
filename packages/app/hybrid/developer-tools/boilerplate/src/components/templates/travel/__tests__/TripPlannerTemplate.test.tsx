import { fireEvent, render, screen } from '@testing-library/react';
import { TripPlannerTemplate } from '../TripPlannerTemplate';

describe('TripPlannerTemplate', () => {
  it('renders day tabs with activities', () => {
    render(<TripPlannerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Trip Planner' })
    ).toBeInTheDocument();
    expect(screen.getByText('Plan your itinerary.')).toBeInTheDocument();
    expect(screen.getByText('3 days')).toBeInTheDocument();
    expect(screen.getAllByText('Day 1')).toHaveLength(2);
    expect(screen.getByText('Day 2')).toBeInTheDocument();
    expect(screen.getByText('Day 3')).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('Ho Chi Minh Mausoleum')).toBeInTheDocument();
    expect(screen.getByText('Ba Dinh')).toBeInTheDocument();
  });

  it('adds an activity to the active day', () => {
    render(<TripPlannerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add activity' }));
    expect(screen.getByText('New activity')).toBeInTheDocument();
    expect(screen.getByText('4 activities')).toBeInTheDocument();
  });

  it('removes an activity from the active day', () => {
    render(<TripPlannerTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.queryByText('Ho Chi Minh Mausoleum')).not.toBeInTheDocument();
    expect(screen.getByText('Pho Street Lunch')).toBeInTheDocument();
  });
});
