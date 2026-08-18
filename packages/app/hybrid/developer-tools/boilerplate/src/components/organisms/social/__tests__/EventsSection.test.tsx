import { fireEvent, render, screen } from '@testing-library/react';
import { EventsSection } from '../EventsSection';

const events = [
  {
    id: 'e1',
    title: 'Jazz Night',
    date: 'Aug 20',
    location: 'Blue Room',
    attendees: 56,
    category: 'Music',
  },
  {
    id: 'e2',
    title: 'Startup Meetup',
    date: 'Sep 02',
    location: 'Downtown Hub',
    attendees: 120,
  },
];

describe('EventsSection', () => {
  it('renders event titles and dates', () => {
    render(<EventsSection events={events} />);
    expect(screen.getByText('Jazz Night')).toBeInTheDocument();
    expect(screen.getAllByText('Aug 20').length).toBeGreaterThan(0);
    expect(screen.getByText('Startup Meetup')).toBeInTheDocument();
  });

  it('renders attendee counts', () => {
    render(<EventsSection events={events} />);
    expect(screen.getByText(/56 attending/)).toBeInTheDocument();
    expect(screen.getByText(/120 attending/)).toBeInTheDocument();
  });

  it('fires onAttend with the event id', () => {
    const onAttend = jest.fn();
    render(<EventsSection events={events} onAttend={onAttend} />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Attend' })[0]);
    expect(onAttend).toHaveBeenCalledWith('e1');
  });

  it('shows an empty state when there are no events', () => {
    render(<EventsSection events={[]} />);
    expect(screen.getByText('No upcoming events')).toBeInTheDocument();
  });
});
