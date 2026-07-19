import { render, screen } from '@testing-library/react';
import CalendarPage from '@/app/(templates)/app/calendar/page';

describe('CalendarPage', () => {
  it('renders the CalendarPage', () => {
    render(<CalendarPage />);
    expect(screen.getByText('Calendar')).toBeInTheDocument();
  });
});
