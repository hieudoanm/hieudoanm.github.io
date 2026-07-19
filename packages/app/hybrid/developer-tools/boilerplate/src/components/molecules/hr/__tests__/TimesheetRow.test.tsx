import { render, screen } from '@testing-library/react';
import { TimesheetRow } from '../TimesheetRow';

const row = {
  day: 'Monday',
  project: 'Mobile app',
  hours: 8,
  overtime: 2,
  status: 'approved' as const,
};

describe('TimesheetRow', () => {
  it('renders day, project, and hours', () => {
    render(<TimesheetRow {...row} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Mobile app')).toBeInTheDocument();
    expect(screen.getByText('8h + 2h OT')).toBeInTheDocument();
    expect(screen.getByText('= 10h')).toBeInTheDocument();
  });

  it('applies the status badge variant', () => {
    render(<TimesheetRow {...row} />);
    expect(screen.getByText('approved')).toHaveClass('badge-success');
  });

  it('omits overtime when zero', () => {
    render(<TimesheetRow {...row} overtime={0} />);
    expect(screen.getByText('8h')).toBeInTheDocument();
    expect(screen.queryByText(/\+ \d+h OT/)).not.toBeInTheDocument();
  });

  it('accepts a custom className', () => {
    render(<TimesheetRow {...row} className="shadow-md" />);
    expect(screen.getByTestId('timesheet-row')).toHaveClass('shadow-md');
  });
});
