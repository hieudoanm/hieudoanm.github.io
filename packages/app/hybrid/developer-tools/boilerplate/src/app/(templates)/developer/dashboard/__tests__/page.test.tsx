import { render, screen } from '@testing-library/react';
import DeviceDashboardPage from '@/app/(templates)/developer/dashboard/page';

describe('DeviceDashboardPage', () => {
  it('renders the DeviceDashboardPage', () => {
    render(<DeviceDashboardPage />);
    expect(
      screen.getByRole('heading', { name: 'Device Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 devices')).toBeInTheDocument();
  });
});
