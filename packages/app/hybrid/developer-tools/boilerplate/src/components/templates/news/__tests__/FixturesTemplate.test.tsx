import { fireEvent, render, screen } from '@testing-library/react';
import { FixturesTemplate } from '../FixturesTemplate';

describe('FixturesTemplate', () => {
  it('renders fixtures with dates, times and venues', () => {
    render(<FixturesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Fixtures' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 fixtures')).toBeInTheDocument();
    expect(screen.getByText('FC Riverside')).toBeInTheDocument();
    expect(screen.getAllByText('Granite FC')).toHaveLength(2);
    expect(screen.getByText('Aug 10, 2026')).toBeInTheDocument();
    expect(screen.getByText('Aug 11, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('18:00')).toHaveLength(2);
    expect(screen.getByText('Riverside Arena')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Remind me' })).toHaveLength(
      4
    );
  });

  it('sets a reminder and shows the Reminder set badge', () => {
    render(<FixturesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remind me' })[0]);
    expect(
      screen.getByRole('button', { name: 'Reminder set' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Reminder set')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Remind me' })).toHaveLength(
      3
    );
  });
});
