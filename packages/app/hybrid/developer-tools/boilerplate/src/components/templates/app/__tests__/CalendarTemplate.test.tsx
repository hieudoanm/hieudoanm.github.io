import { fireEvent, render, screen } from '@testing-library/react';
import { CalendarTemplate } from '../CalendarTemplate';

describe('CalendarTemplate', () => {
  const now = new Date();
  const initialLabel = `${now.toLocaleString('en-US', {
    month: 'long',
  })} ${now.getFullYear()}`;

  it('renders the current month with today highlighted', () => {
    render(<CalendarTemplate />);
    expect(screen.getByText(initialLabel)).toBeInTheDocument();
    const todayButton = screen.getByRole('button', {
      name: `Select day ${now.getDate()}`,
    });
    expect(todayButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('navigates to the previous and next month', () => {
    render(<CalendarTemplate />);
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const nextLabel = `${next.toLocaleString('en-US', {
      month: 'long',
    })} ${next.getFullYear()}`;
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText(nextLabel)).toBeInTheDocument();
    expect(screen.queryByText(initialLabel)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText(initialLabel)).toBeInTheDocument();
  });

  it('shows events when selecting a day that has them', () => {
    render(<CalendarTemplate />);
    const isTodayFive = now.getDate() === 5;
    const eventDay = isTodayFive ? 12 : 5;
    fireEvent.click(
      screen.getByRole('button', { name: `Select day ${eventDay}` })
    );
    expect(
      screen.getByRole('button', { name: `Select day ${eventDay}` })
    ).toHaveAttribute('aria-pressed', 'true');
    if (isTodayFive) {
      expect(screen.getByText('Client call')).toBeInTheDocument();
    } else {
      expect(screen.getByText('Team standup')).toBeInTheDocument();
      expect(screen.getByText('Design review')).toBeInTheDocument();
    }
    expect(screen.getByText(`Events for day ${eventDay}`)).toBeInTheDocument();
  });

  it('shows the empty state when selecting a day without events', () => {
    render(<CalendarTemplate />);
    const noEventDay = now.getDate() === 2 ? 3 : 2;
    fireEvent.click(
      screen.getByRole('button', { name: `Select day ${noEventDay}` })
    );
    expect(screen.getByText('No events')).toBeInTheDocument();
    expect(screen.queryByText('Team standup')).not.toBeInTheDocument();
  });
});
