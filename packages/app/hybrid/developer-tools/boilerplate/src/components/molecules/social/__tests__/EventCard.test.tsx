import { render, screen } from '@testing-library/react';
import { EventCard } from '../EventCard';

describe('EventCard', () => {
  it('renders title, date and location', () => {
    render(
      <EventCard title="Hackathon" date="Aug 20, 2026" location="Hanoi" />
    );
    expect(screen.getByText('Hackathon')).toBeInTheDocument();
    expect(screen.getByText('Aug 20, 2026')).toBeInTheDocument();
    expect(screen.getByText('Hanoi')).toBeInTheDocument();
  });

  it('renders attendees and price when provided', () => {
    render(
      <EventCard
        title="Hackathon"
        date="Aug 20, 2026"
        attendees={42}
        price="Free"
      />
    );
    expect(screen.getByText('42 attending')).toBeInTheDocument();
    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  it('renders the month and day badge when provided', () => {
    render(<EventCard title="Hackathon" date="Aug 20" month="AUG" day={20} />);
    expect(screen.getByText('AUG')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('omits the date badge when month and day are absent', () => {
    render(<EventCard title="Hackathon" date="Aug 20" />);
    expect(screen.queryByText('AUG')).not.toBeInTheDocument();
  });
});
