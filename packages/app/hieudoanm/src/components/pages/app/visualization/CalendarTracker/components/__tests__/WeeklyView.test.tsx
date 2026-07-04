jest.mock('../Dot', () => ({
  Dot: ({ index, date }: { index: number; date: Date }) => (
    <span data-testid="dot" data-index={index} data-date={date.toISOString()}>
      {index}
    </span>
  ),
}));

jest.mock('../Weekday', () => ({
  Weekday: () => <div data-testid="weekday" />,
}));

jest.mock('../../constants', () => ({
  daysOfMonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  months: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  isLeapYear: () => false,
}));

import { render, screen } from '@testing-library/react';
import { WeeklyView } from '../WeeklyView';

describe('WeeklyView', () => {
  it('renders Dot components for each month', () => {
    render(<WeeklyView year={2024} withWeekday={false} />);
    const dots = screen.getAllByTestId('dot');
    expect(dots.length).toBeGreaterThan(300);
  });

  it('renders Weekday component when withWeekday is true', () => {
    render(<WeeklyView year={2024} withWeekday={true} />);
    expect(screen.getByTestId('weekday')).toBeInTheDocument();
  });

  it('renders Dot components', () => {
    render(<WeeklyView year={2024} withWeekday={false} />);
    const dots = screen.getAllByTestId('dot');
    expect(dots.length).toBeGreaterThan(300);
  });
});
