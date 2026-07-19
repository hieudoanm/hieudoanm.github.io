import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/(templates)/app/dashboard/page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/app/dashboard',
}));

describe('DashboardPage', () => {
  it('renders dashboard stats', () => {
    render(<DashboardPage />);
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThan(0);
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('$48,250')).toBeInTheDocument();
  });
});
