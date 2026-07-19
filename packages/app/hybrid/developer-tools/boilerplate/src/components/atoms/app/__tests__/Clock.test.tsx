import { act, render, screen } from '@testing-library/react';
import { Clock } from '../Clock';

describe('Clock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 0, 1, 13, 5, 9));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the time in 24h format with seconds', () => {
    render(<Clock />);
    expect(screen.getByText('13:05:09')).toBeInTheDocument();
  });

  it('hides seconds when disabled', () => {
    render(<Clock showSeconds={false} />);
    expect(screen.getByText('13:05')).toBeInTheDocument();
  });

  it('renders 12h format with AM/PM', () => {
    render(<Clock format="12h" />);
    expect(screen.getByText('01:05:09 PM')).toBeInTheDocument();
  });

  it('updates the displayed time on an interval', () => {
    render(<Clock />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('13:05:10')).toBeInTheDocument();
  });
});
