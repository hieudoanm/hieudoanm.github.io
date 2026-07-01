jest.mock('@lodashx/ts', () => ({
  calendar: jest.fn(() => [
    [
      { date: 29, currentMonth: 'previous' },
      { date: 30, currentMonth: 'previous' },
      { date: 31, currentMonth: 'previous' },
      { date: 1, currentMonth: 'current' },
      { date: 2, currentMonth: 'current' },
      { date: 3, currentMonth: 'current' },
      { date: 4, currentMonth: 'current' },
    ],
    [
      { date: 5, currentMonth: 'current' },
      { date: 6, currentMonth: 'current' },
      { date: 7, currentMonth: 'current' },
      { date: 8, currentMonth: 'current' },
      { date: 9, currentMonth: 'current' },
      { date: 10, currentMonth: 'current' },
      { date: 11, currentMonth: 'current' },
    ],
  ]),
  weekOfYear: jest.fn(() => 27),
}));

import { fireEvent, render, screen } from '@testing-library/react';
import { CalendarGrid } from '../CalendarGrid';

describe('CalendarGrid', () => {
  const defaultProps = {
    year: 2026,
    month: 6,
    today: new Date(2026, 6, 8),
    chosenDate: new Date(2026, 6, 1),
    setChosenDate: jest.fn(),
    events: [],
  };

  it('should render', () => {
    const { container } = render(<CalendarGrid {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should call setChosenDate on day click', () => {
    render(<CalendarGrid {...defaultProps} />);
    fireEvent.click(screen.getByText('8'));
    expect(defaultProps.setChosenDate).toHaveBeenCalled();
  });

  it('should highlight today', () => {
    render(<CalendarGrid {...defaultProps} />);
    const todayBtn = screen.getByText('8');
    expect(todayBtn.className).toContain('text-base-content/60');
  });

  it('should dim days outside current month', () => {
    render(<CalendarGrid {...defaultProps} />);
    const prevMonthBtn = screen.getByText('29');
    expect(prevMonthBtn.className).toContain('text-base-content/20');
  });

  it('should show events indicator on days with events', () => {
    const event = {
      title: 'Test',
      field: 'Test',
      date: 5,
      month: 7,
      year: 2026,
      frequency: 'annual' as const,
      type: 'holiday',
      country: 'US',
    };
    render(<CalendarGrid {...defaultProps} events={[event]} />);
    const eventDayBtn = screen.getByText('5');
    expect(eventDayBtn.className).toContain('text-primary');
  });
});
