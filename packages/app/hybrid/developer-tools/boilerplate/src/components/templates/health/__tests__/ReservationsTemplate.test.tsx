import { fireEvent, render, screen } from '@testing-library/react';
import { ReservationsTemplate } from '../ReservationsTemplate';

describe('ReservationsTemplate', () => {
  it('renders upcoming reservations', () => {
    render(<ReservationsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Reservations' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 reservations')).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.getByText('Aug 15, 2026')).toBeInTheDocument();
    expect(screen.getByText('19:30')).toBeInTheDocument();
    expect(screen.getByText('4 guests')).toBeInTheDocument();
    expect(screen.getAllByText('Confirmed')).toHaveLength(2);
    expect(screen.getAllByText('Pending')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(2);
  });

  it('cancels a pending reservation', () => {
    render(<ReservationsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Cancel' })[0]);
    expect(screen.getAllByText('Cancelled')).toHaveLength(1);
    expect(screen.getAllByText('Pending')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(1);
    expect(screen.getByText('4 reservations')).toBeInTheDocument();
  });
});
