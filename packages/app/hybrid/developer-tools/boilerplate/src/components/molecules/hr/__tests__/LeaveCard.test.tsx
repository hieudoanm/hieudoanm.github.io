import { render, screen } from '@testing-library/react';
import { LeaveCard } from '../LeaveCard';

const leave = {
  employee: 'Jane Doe',
  type: 'Annual leave',
  from: '2026-08-10',
  to: '2026-08-14',
  days: 5,
  status: 'approved' as const,
  reason: 'Vacation',
};

describe('LeaveCard', () => {
  it('renders leave request details', () => {
    render(<LeaveCard leave={leave} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Annual leave')).toBeInTheDocument();
    expect(screen.getByText('2026-08-10')).toBeInTheDocument();
    expect(screen.getByText('2026-08-14')).toBeInTheDocument();
    expect(screen.getByText('Vacation')).toBeInTheDocument();
  });

  it('applies the status badge variant', () => {
    render(<LeaveCard leave={{ ...leave, status: 'pending' }} />);
    expect(screen.getByText('pending')).toHaveClass('badge-warning');
  });

  it('hides optional reason and days when omitted', () => {
    render(
      <LeaveCard leave={{ ...leave, days: undefined, reason: undefined }} />
    );
    expect(screen.queryByText('Vacation')).not.toBeInTheDocument();
    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });
});
