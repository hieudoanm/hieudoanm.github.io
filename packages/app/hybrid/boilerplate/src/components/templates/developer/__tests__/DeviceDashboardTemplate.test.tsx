import { fireEvent, render, screen } from '@testing-library/react';
import { DeviceDashboardTemplate } from '../DeviceDashboardTemplate';

describe('DeviceDashboardTemplate', () => {
  it('renders all device cards with status badges', () => {
    render(<DeviceDashboardTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Device Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 devices')).toBeInTheDocument();
    expect(screen.getByText('5 online')).toBeInTheDocument();
    expect(screen.getByText('Thermostat')).toBeInTheDocument();
    expect(screen.getAllByText('Online')).toHaveLength(5);
    expect(screen.getAllByText('Offline')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(3);
  });

  it('toggles a device on and off', () => {
    render(<DeviceDashboardTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Turn off' })[0]);
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(4);
    fireEvent.click(screen.getAllByRole('button', { name: 'Turn on' })[0]);
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(3);
  });
});
