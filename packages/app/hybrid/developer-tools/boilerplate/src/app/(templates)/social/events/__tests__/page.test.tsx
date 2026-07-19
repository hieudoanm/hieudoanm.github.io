import { render, screen } from '@testing-library/react';
import EventsPage from '@/app/(templates)/social/events/page';

describe('EventsPage', () => {
  it('renders the events page', () => {
    render(<EventsPage />);
    expect(screen.getByRole('heading', { name: 'Events' })).toBeInTheDocument();
  });
});
