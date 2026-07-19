import { render, screen } from '@testing-library/react';
import ReservationsPage from '@/app/(templates)/health/reservations/page';

describe('ReservationsPage', () => {
  it('renders the ReservationsPage', () => {
    render(<ReservationsPage />);
    expect(screen.getByText('4 reservations')).toBeInTheDocument();
  });
});
