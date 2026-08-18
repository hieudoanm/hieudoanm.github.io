import { fireEvent, render, screen } from '@testing-library/react';
import { WatchHistoryTemplate } from '../WatchHistoryTemplate';

describe('WatchHistoryTemplate', () => {
  it('renders history entries with dates and progress', () => {
    render(<WatchHistoryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'History' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 watched titles')).toBeInTheDocument();
    expect(screen.getByText('Starfall Protocol')).toBeInTheDocument();
    expect(screen.getByText('Aug 3, 2026')).toBeInTheDocument();
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getAllByText('Completed')).toHaveLength(3);
  });

  it('clears the history and shows the empty state', () => {
    render(<WatchHistoryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear history' }));
    expect(screen.getByText('0 watched titles')).toBeInTheDocument();
    expect(screen.getByText('No history')).toBeInTheDocument();
    expect(screen.queryByText('Starfall Protocol')).not.toBeInTheDocument();
  });
});
