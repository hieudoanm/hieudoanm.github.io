import { render, screen } from '@testing-library/react';
import { ItineraryView } from '../ItineraryView';

const days = [
  {
    day: 1,
    title: 'Arrival',
    description: 'Check in and relax',
    activities: [
      { id: 't1', time: '14:00', name: 'Hotel check-in' },
      { id: 't2', time: '18:00', name: 'Dinner cruise' },
    ],
  },
];

describe('ItineraryView', () => {
  it('renders the itinerary title and dates', () => {
    render(
      <ItineraryView title="Tokyo Week" dates="Aug 10 - Aug 17" days={days} />
    );
    expect(screen.getByText('Tokyo Week')).toBeInTheDocument();
    expect(screen.getByText('Aug 10 - Aug 17')).toBeInTheDocument();
  });

  it('renders day headers and activities', () => {
    render(<ItineraryView title="Tokyo Week" dates="Aug 10" days={days} />);
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('Arrival')).toBeInTheDocument();
    expect(screen.getByText('Hotel check-in')).toBeInTheDocument();
    expect(screen.getByText('Dinner cruise')).toBeInTheDocument();
  });
});
