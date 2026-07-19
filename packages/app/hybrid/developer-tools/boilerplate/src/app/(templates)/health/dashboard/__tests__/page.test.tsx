import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/(templates)/health/dashboard/page';

describe('DashboardPage', () => {
  it('renders the dashboard page', () => {
    render(<DashboardPage />);
    expect(
      screen.getByRole('heading', { name: 'Health Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 days tracked')).toBeInTheDocument();
  });
});
