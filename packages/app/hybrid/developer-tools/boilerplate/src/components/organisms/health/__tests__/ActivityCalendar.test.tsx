import { render, screen } from '@testing-library/react';
import { ActivityCalendar } from '../ActivityCalendar';

describe('ActivityCalendar', () => {
  it('renders a cell for each day', () => {
    render(
      <ActivityCalendar
        days={[
          { day: 'Mon', level: 3 },
          { day: 'Tue', level: 1 },
          { day: 'Wed', level: 0 },
        ]}
      />
    );
    expect(screen.getByTestId('calendar-grid')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
  });

  it('applies the intense color class for high activity', () => {
    const { container } = render(
      <ActivityCalendar days={[{ day: 'Mon', level: 3 }]} />
    );
    expect(container.querySelector('.bg-primary')).not.toBeNull();
  });

  it('applies a muted color class for rest days', () => {
    const { container } = render(
      <ActivityCalendar days={[{ day: 'Wed', level: 0 }]} />
    );
    expect(container.querySelector('.bg-base-300')).not.toBeNull();
  });

  it('shows an empty state when there are no days', () => {
    render(<ActivityCalendar days={[]} />);
    expect(screen.getByTestId('empty')).toHaveTextContent(
      'No activity recorded.'
    );
  });
});
