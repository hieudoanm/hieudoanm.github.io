import { fireEvent, render, screen } from '@testing-library/react';
import { TournamentsTemplate } from '../TournamentsTemplate';

describe('TournamentsTemplate', () => {
  it('renders tournaments with statuses, prizes and dates', () => {
    render(<TournamentsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Tournaments' })
    ).toBeInTheDocument();
    expect(screen.getByText('Upcoming and live events.')).toBeInTheDocument();
    expect(screen.getByText('5 tournaments')).toBeInTheDocument();
    expect(screen.getByText('Aurora Cup')).toBeInTheDocument();
    expect(screen.getByText('$10,000 prize')).toBeInTheDocument();
    expect(screen.getByText('Aug 15, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('Registering')).toHaveLength(3);
    expect(screen.getAllByText('Live')).toHaveLength(1);
    expect(screen.getAllByText('Finished')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Register' })).toHaveLength(3);
  });

  it('registers for a tournament', () => {
    render(<TournamentsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Register' })[0]);
    expect(
      screen.getByRole('button', { name: 'Registered' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Registered')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Register' })).toHaveLength(2);
  });
});
