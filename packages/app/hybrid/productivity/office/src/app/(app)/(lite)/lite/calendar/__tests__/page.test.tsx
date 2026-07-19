import { render, screen } from '@testing-library/react';

jest.mock('@/components/calendar/organisms/LiteCalendar', () => ({
  LiteCalendar: () => <div data-testid="lite-calendar">LiteCalendar</div>,
}));

import LiteCalendarPage from '@/app/(app)/(lite)/lite/calendar/page';

describe('LiteCalendarPage', () => {
  it('renders LiteCalendar', () => {
    render(<LiteCalendarPage />);
    expect(screen.getByTestId('lite-calendar')).toBeInTheDocument();
  });
});
