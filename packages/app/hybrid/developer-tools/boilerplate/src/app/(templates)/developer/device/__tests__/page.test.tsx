import { render, screen } from '@testing-library/react';
import DeviceDetailPage from '@/app/(templates)/developer/device/page';

describe('DeviceDetailPage', () => {
  it('renders the DeviceDetailPage', () => {
    render(<DeviceDetailPage />);
    expect(
      screen.getByRole('heading', { name: 'Device Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('Living Room Thermostat')).toBeInTheDocument();
  });
});
