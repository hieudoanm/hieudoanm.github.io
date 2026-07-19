import { render, screen } from '@testing-library/react';
import { AttendanceTable } from '../AttendanceTable';

const rows = [
  {
    date: '2026-08-01',
    checkIn: '09:00',
    checkOut: '18:00',
    hours: 8,
    status: 'present' as const,
  },
  { date: '2026-08-02', hours: 6, status: 'late' as const },
];

describe('AttendanceTable', () => {
  it('renders column headers and row data', () => {
    render(<AttendanceTable rows={rows} />);
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('2026-08-01')).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('8h')).toBeInTheDocument();
  });

  it('shows a dash when check-in is missing', () => {
    render(<AttendanceTable rows={rows} />);
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });

  it('applies the status badge variant per row', () => {
    render(<AttendanceTable rows={rows} />);
    expect(screen.getByText('present')).toHaveClass('badge-success');
    expect(screen.getByText('late')).toHaveClass('badge-warning');
  });

  it('renders an empty message when there are no rows', () => {
    render(<AttendanceTable rows={[]} />);
    expect(screen.getByText('No attendance records')).toBeInTheDocument();
  });
});
