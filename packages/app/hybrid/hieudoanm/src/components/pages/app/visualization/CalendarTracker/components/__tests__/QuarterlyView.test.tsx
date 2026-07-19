jest.mock('../DotModal', () => ({
  Dot: ({ index, date }: { index: number; date: Date }) => (
    <span data-testid="dot" data-index={index} data-date={date.toISOString()}>
      {index}
    </span>
  ),
}));

jest.mock('../../constants', () => ({
  daysOfMonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
}));

import { render, screen } from '@testing-library/react';
import { QuarterlyView, HalfView } from '../QuarterlyViewModal';

describe('QuarterlyView', () => {
  it('renders 4 quarters', () => {
    render(<QuarterlyView year={2024} />);
    expect(screen.getByText('Quarter 1')).toBeInTheDocument();
    expect(screen.getByText('Quarter 4')).toBeInTheDocument();
  });

  it('renders Dot components', () => {
    render(<QuarterlyView year={2024} />);
    const dots = screen.getAllByTestId('dot');
    expect(dots.length).toBeGreaterThan(300);
  });
});

describe('HalfView', () => {
  it('renders 2 halves', () => {
    render(<HalfView year={2024} />);
    expect(screen.getByText('Half 1')).toBeInTheDocument();
    expect(screen.getByText('Half 2')).toBeInTheDocument();
  });

  it('renders Dot components', () => {
    render(<HalfView year={2024} />);
    const dots = screen.getAllByTestId('dot');
    expect(dots.length).toBeGreaterThan(300);
  });
});
