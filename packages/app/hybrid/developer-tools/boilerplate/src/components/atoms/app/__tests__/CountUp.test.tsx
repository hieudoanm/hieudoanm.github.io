import { act, render, screen } from '@testing-library/react';
import { CountUp } from '../CountUp';

describe('CountUp', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the starting value', () => {
    render(<CountUp end={100} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('animates to the end value', () => {
    jest.useFakeTimers();
    render(<CountUp end={100} duration={1000} />);
    act(() => {
      jest.advanceTimersByTime(1200);
    });
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders prefix, suffix, and decimals', () => {
    jest.useFakeTimers();
    render(
      <CountUp end={50} duration={1000} prefix="$" suffix="k" decimals={1} />
    );
    act(() => {
      jest.advanceTimersByTime(1200);
    });
    expect(screen.getByText('$50.0k')).toBeInTheDocument();
  });
});
