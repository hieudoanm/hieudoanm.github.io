import { fireEvent, render, screen } from '@testing-library/react';
import { ActivityTrackerTemplate } from '../ActivityTrackerTemplate';

describe('ActivityTrackerTemplate', () => {
  it('renders the activity stats and the daily timeline', () => {
    render(<ActivityTrackerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Activity Tracker' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 entries today')).toBeInTheDocument();
    expect(screen.getByText('8,940')).toBeInTheDocument();
    expect(screen.getByText('6.2 km')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('2,380')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sync' })).toBeInTheDocument();
  });

  it('syncs and shows the Synced just now badge', () => {
    render(<ActivityTrackerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Sync' }));
    expect(screen.getByText('Synced just now')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Sync' })
    ).not.toBeInTheDocument();
  });
});
