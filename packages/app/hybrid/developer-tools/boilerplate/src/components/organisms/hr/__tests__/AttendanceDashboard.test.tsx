import { render, screen } from '@testing-library/react';
import { AttendanceDashboard } from '../AttendanceDashboard';

describe('AttendanceDashboard', () => {
  const records = [
    {
      id: '1',
      name: 'Ada Lovelace',
      date: '2026-08-01',
      checkIn: '09:00',
      checkOut: '17:00',
      hours: 8,
      status: 'present' as const,
    },
    {
      id: '2',
      name: 'Grace Hopper',
      date: '2026-08-01',
      checkIn: '09:40',
      checkOut: '17:00',
      hours: 7.3,
      status: 'late' as const,
    },
  ];

  it('renders summary counts and rows', () => {
    render(<AttendanceDashboard records={records} />);
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('8.0')).toBeInTheDocument();
  });

  it('applies status badge classes', () => {
    render(<AttendanceDashboard records={records} />);
    expect(screen.getByText('present')).toHaveClass('badge-success');
    expect(screen.getByText('late')).toHaveClass('badge-warning');
  });

  it('shows an empty state when no records exist', () => {
    render(<AttendanceDashboard records={[]} />);
    expect(screen.getByText('No attendance records')).toBeInTheDocument();
  });
});
