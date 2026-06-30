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
  isLeapYear: () => false,
}));

import { render, screen } from '@testing-library/react';
import { DailyView } from '../DailyView';

describe('DailyView', () => {
  it('renders Weekday when withWeekday is true', () => {
    render(<DailyView year={2024} withWeekday={true} />);
    expect(screen.getByTestId('weekday')).toBeInTheDocument();
  });

  it('renders without Weekday when withWeekday is false', () => {
    render(<DailyView year={2024} withWeekday={false} />);
    expect(screen.queryByTestId('weekday')).not.toBeInTheDocument();
  });

  it('renders Dot components', () => {
    render(<DailyView year={2024} withWeekday={false} />);
    const dots = screen.getAllByTestId('dot');
    expect(dots.length).toBeGreaterThan(300);
  });
});
