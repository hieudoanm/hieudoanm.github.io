import { render, screen } from '@testing-library/react';

jest.mock('@/components/organisms/CalendarApp', () => ({
  CalendarApp: () => <div data-testid="calendar-app">CalendarApp</div>,
}));

import CalendarPage from '@/app/(app)/calendar/page';

describe('CalendarPage', () => {
  it('renders CalendarApp', () => {
    render(<CalendarPage />);
    expect(screen.getByTestId('calendar-app')).toBeInTheDocument();
  });
});
