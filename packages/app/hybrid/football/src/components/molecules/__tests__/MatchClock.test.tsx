import { act, fireEvent, render, screen } from '@testing-library/react';
import { MatchClock } from '@/components/molecules/MatchClock';

describe('MatchClock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts at zero in the first half', () => {
    render(<MatchClock />);
    expect(screen.getByLabelText('Match time')).toHaveTextContent('00:00');
    expect(screen.getByText('1st half')).toBeInTheDocument();
  });

  it('starts, ticks, and pauses', () => {
    render(<MatchClock />);
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByLabelText('Match time')).toHaveTextContent('00:03');
    fireEvent.click(screen.getByRole('button', { name: 'Pause match clock' }));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByLabelText('Match time')).toHaveTextContent('00:03');
  });

  it('moves into half-time at 45 minutes', () => {
    render(<MatchClock />);
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    act(() => {
      jest.advanceTimersByTime(45 * 60 * 1000);
    });
    expect(screen.getByText('Half-time')).toBeInTheDocument();
    expect(screen.getByLabelText('Match time')).toHaveTextContent('45:00');
  });

  it('resets the clock', () => {
    render(<MatchClock />);
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Reset match clock' }));
    expect(screen.getByLabelText('Match time')).toHaveTextContent('00:00');
    expect(screen.getByText('1st half')).toBeInTheDocument();
  });

  it('stops at full time', () => {
    render(<MatchClock />);
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    act(() => {
      jest.advanceTimersByTime(106 * 60 * 1000);
    });
    expect(screen.getByText('Full time')).toBeInTheDocument();
    expect(screen.getByLabelText('Match time')).toHaveTextContent('105:00');
  });

  it('restarts from zero when starting after full time', () => {
    render(<MatchClock />);
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    act(() => {
      jest.advanceTimersByTime(106 * 60 * 1000);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Start match clock' }));
    expect(screen.getByLabelText('Match time')).toHaveTextContent('00:00');
    expect(screen.getByText('1st half')).toBeInTheDocument();
  });
});
