import { render, screen } from '@testing-library/react';
import { MonthlyView } from '../MonthlyViewModal';

jest.mock('../DotModal', () => ({
  Dot: ({ index, date }: { index: number; date: Date }) => (
    <span data-testid="dot" data-index={index} data-date={date.toISOString()}>
      {index}
    </span>
  ),
}));

jest.mock('../../constants', () => ({
  daysOfMonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
}));

describe('MonthlyView', () => {
  it('renders all 12 months', () => {
    render(<MonthlyView year={2024} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
    expect(screen.getByText('Dec')).toBeInTheDocument();
  });

  it('renders Dot components for each day of month', () => {
    render(<MonthlyView year={2024} />);
    const dots = screen.getAllByTestId('dot');
    expect(dots.length).toBeGreaterThan(300);
  });
});
