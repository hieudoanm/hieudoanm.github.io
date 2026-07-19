import { render, screen } from '@testing-library/react';
import { TimesheetDashboard } from '../TimesheetDashboard';

describe('TimesheetDashboard', () => {
  const entries = [
    {
      id: '1',
      week: '2026-W31',
      project: 'Pulse',
      hours: 32,
      billable: true,
      status: 'approved' as const,
    },
    {
      id: '2',
      week: '2026-W31',
      project: 'Nimbus',
      hours: 8,
      billable: false,
      status: 'pending' as const,
    },
  ];

  it('computes and renders total and billable hours', () => {
    render(<TimesheetDashboard entries={entries} />);
    expect(screen.getAllByText('40.0').length).toBeGreaterThan(0);
    expect(screen.getAllByText('32.0').length).toBeGreaterThan(0);
  });

  it('renders entry rows', () => {
    render(<TimesheetDashboard entries={entries} />);
    expect(screen.getByText('Pulse')).toBeInTheDocument();
    expect(screen.getByText('Nimbus')).toBeInTheDocument();
  });

  it('applies billable and status badge classes', () => {
    render(<TimesheetDashboard entries={entries} />);
    expect(screen.getByText('billable')).toHaveClass('badge-info');
    expect(screen.getByText('approved')).toHaveClass('badge-success');
    expect(screen.getByText('pending')).toHaveClass('badge-warning');
  });

  it('shows an empty state when no entries exist', () => {
    render(<TimesheetDashboard entries={[]} />);
    expect(screen.getByText('No timesheet entries')).toBeInTheDocument();
  });
});
