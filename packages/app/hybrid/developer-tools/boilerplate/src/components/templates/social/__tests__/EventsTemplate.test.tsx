import { fireEvent, render, screen } from '@testing-library/react';
import { EventsTemplate } from '../EventsTemplate';

describe('EventsTemplate', () => {
  it('renders events with date, location and RSVP state', () => {
    render(<EventsTemplate />);
    expect(screen.getByRole('heading', { name: 'Events' })).toBeInTheDocument();
    expect(screen.getByText('5 events')).toBeInTheDocument();
    expect(
      screen.getByText('TypeScript Meetup: Generics Deep Dive')
    ).toBeInTheDocument();
    expect(screen.getByText('Aug 12, 2026')).toBeInTheDocument();
    expect(screen.getByText('Downtown Hub')).toBeInTheDocument();
    expect(screen.getAllByText('Attending')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'RSVP' })).toHaveLength(3);
  });

  it('filters events by Upcoming and Past', () => {
    render(<EventsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Upcoming' }));
    expect(screen.getByText('3 events')).toBeInTheDocument();
    expect(
      screen.queryByText('Hackathon: Accessibility Edition')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Past' }));
    expect(screen.getByText('2 events')).toBeInTheDocument();
    expect(
      screen.getByText('Hackathon: Accessibility Edition')
    ).toBeInTheDocument();
  });

  it('RSVPs to an event', () => {
    render(<EventsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'RSVP' })[0]);
    expect(screen.getAllByText('Attending')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'RSVP' })).toHaveLength(2);
  });
});
