import { fireEvent, render, screen, within } from '@testing-library/react';
import { HealthDashboardTemplate } from '../HealthDashboardTemplate';

describe('HealthDashboardTemplate', () => {
  it('renders summary stats and the weekly activity table', () => {
    render(<HealthDashboardTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Health Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 days tracked')).toBeInTheDocument();
    expect(screen.getByText('8,940')).toBeInTheDocument();
    expect(screen.getByText('58 bpm')).toBeInTheDocument();
    expect(screen.getAllByText('Steps')).toHaveLength(2);
    const table = screen.getByRole('table');
    expect(within(table).getByText('Monday')).toBeInTheDocument();
    expect(within(table).getByText('14,560')).toBeInTheDocument();
    expect(screen.getByText("Today's Health")).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Check in' })
    ).toBeInTheDocument();
  });

  it('toggles the check-in badge', () => {
    render(<HealthDashboardTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Check in' }));
    expect(screen.getByText('Checked in')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Check in' })
    ).not.toBeInTheDocument();
  });
});
