import { fireEvent, render, screen } from '@testing-library/react';
import { SleepTrackerTemplate } from '../SleepTrackerTemplate';

describe('SleepTrackerTemplate', () => {
  it('renders the sleep stats and the weekly table', () => {
    render(<SleepTrackerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Sleep Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 nights tracked')).toBeInTheDocument();
    expect(screen.getByText('82')).toBeInTheDocument();
    expect(screen.getByText('1.8 h')).toBeInTheDocument();
    expect(screen.getAllByText('7.5 h')).toHaveLength(2);
    expect(screen.getAllByText('Good')).toHaveLength(5);
    expect(
      screen.getByRole('button', { name: 'Track tonight' })
    ).toBeInTheDocument();
  });

  it('starts tracking tonight', () => {
    render(<SleepTrackerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Track tonight' }));
    expect(screen.getByText('Tracking tonight')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Track tonight' })
    ).not.toBeInTheDocument();
  });
});
