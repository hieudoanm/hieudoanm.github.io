import { fireEvent, render, screen } from '@testing-library/react';
import { LeaveCalendar } from '../LeaveCalendar';

describe('LeaveCalendar', () => {
  const leaves = [
    { date: '2026-08-10', name: 'Ada Lovelace', type: 'annual' as const },
    { date: '2026-08-10', name: 'Grace Hopper', type: 'sick' as const },
  ];

  it('renders the month of the first leave date', () => {
    render(<LeaveCalendar leaves={leaves} />);
    expect(screen.getByText(/August 2026/)).toBeInTheDocument();
  });

  it('shows leave badges on days that have leave', () => {
    render(<LeaveCalendar leaves={leaves} />);
    expect(screen.getByText('Ada Lovelace')).toHaveClass('badge-success');
  });

  it('reveals leave details for a selected day', () => {
    render(<LeaveCalendar leaves={leaves} />);
    const dayButton = screen.getByText('10');
    fireEvent.click(dayButton);
    expect(screen.getByText(/annual/)).toBeInTheDocument();
    expect(screen.getAllByText('Grace Hopper').length).toBeGreaterThan(0);
  });

  it('navigates to the previous month', () => {
    render(<LeaveCalendar leaves={leaves} />);
    fireEvent.click(screen.getByLabelText('Previous month'));
    expect(screen.getByText(/July 2026/)).toBeInTheDocument();
  });
});
