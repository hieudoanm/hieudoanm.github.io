import { fireEvent, render, screen, within } from '@testing-library/react';
import { DeviceDashboardTemplate } from '../DeviceDashboardTemplate';
import { DeviceDetailTemplate } from '../DeviceDetailTemplate';
import { ScenesTemplate } from '../ScenesTemplate';
import { AutomationsTemplate } from '../AutomationsTemplate';
import { EnergyUsageTemplate } from '../EnergyUsageTemplate';
import { SecurityTemplate } from '../SecurityTemplate';
import { SensorDataTemplate } from '../SensorDataTemplate';
import { SmartHomeSettingsTemplate } from '../SmartHomeSettingsTemplate';
import DeviceDashboardPage from '@/app/(main)/iot/dashboard/page';
import DeviceDetailPage from '@/app/(main)/iot/device/page';
import ScenesPage from '@/app/(main)/iot/scenes/page';
import AutomationsPage from '@/app/(main)/iot/automations/page';
import EnergyUsagePage from '@/app/(main)/iot/energy/page';
import SecurityPage from '@/app/(main)/iot/security/page';
import SensorDataPage from '@/app/(main)/iot/sensors/page';
import SmartHomeSettingsPage from '@/app/(main)/iot/settings/page';

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

describe('DeviceDetailTemplate', () => {
  it('renders the thermostat detail with temperatures', () => {
    render(<DeviceDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Device Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('1 device')).toBeInTheDocument();
    expect(screen.getByText('Living Room Thermostat')).toBeInTheDocument();
    expect(screen.getByText('72°F')).toBeInTheDocument();
    expect(screen.getByText('Target 70°F')).toBeInTheDocument();
    expect(screen.getByText('Current mode: Heat')).toBeInTheDocument();
  });

  it('cycles the mode and switches tabs', () => {
    render(<DeviceDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Change mode' }));
    expect(screen.getByText('Current mode: Cool')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Change mode' }));
    expect(screen.getByText('Current mode: Auto')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Heat' }));
    expect(screen.getByText('Current mode: Heat')).toBeInTheDocument();
  });
});

describe('ScenesTemplate', () => {
  it('lists all scenes with device counts', () => {
    render(<ScenesTemplate />);
    expect(screen.getByRole('heading', { name: 'Scenes' })).toBeInTheDocument();
    expect(screen.getByText('4 scenes')).toBeInTheDocument();
    expect(screen.getByText('Movie Night')).toBeInTheDocument();
    expect(screen.getByText('Goodnight')).toBeInTheDocument();
    expect(screen.getByText('5 devices')).toBeInTheDocument();
    expect(screen.getAllByText('Not active')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Activate' })).toHaveLength(4);
  });

  it('activates and deactivates a scene', () => {
    render(<ScenesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Activate' })[0]);
    expect(screen.getByText('Scene active')).toBeInTheDocument();
    expect(screen.getAllByText('Not active')).toHaveLength(3);
    expect(screen.getAllByRole('button', { name: 'Deactivate' })).toHaveLength(
      1
    );
    fireEvent.click(screen.getByRole('button', { name: 'Deactivate' }));
    expect(screen.getAllByText('Not active')).toHaveLength(4);
    expect(screen.queryByText('Scene active')).not.toBeInTheDocument();
  });
});

describe('AutomationsTemplate', () => {
  it('lists automations with toggles and status badges', () => {
    render(<AutomationsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Automations' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 automations')).toBeInTheDocument();
    expect(screen.getByText('Turn off lights at 11pm')).toBeInTheDocument();
    expect(screen.getByText('Start robot vacuum at 9am')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(2);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Paused')).toHaveLength(2);
  });

  it('toggles an automation on and off', () => {
    render(<AutomationsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Turn off' })[0]);
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(3);
    expect(screen.getAllByText('Paused')).toHaveLength(3);
    fireEvent.click(screen.getAllByRole('button', { name: 'Turn on' })[0]);
    expect(screen.getAllByRole('button', { name: 'Turn off' })).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Turn on' })).toHaveLength(2);
  });
});

describe('EnergyUsageTemplate', () => {
  it('renders usage stats, room bars, and weekly summary', () => {
    render(<EnergyUsageTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Energy Usage' })
    ).toBeInTheDocument();
    expect(screen.getByText('12.4 kWh')).toBeInTheDocument();
    expect(screen.getByText('$2.10')).toBeInTheDocument();
    expect(screen.getByText('3 rooms')).toBeInTheDocument();
    expect(screen.getByText('7 days')).toBeInTheDocument();
    expect(screen.getByText('Living Room')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
    expect(screen.getByText('Monday')).toBeInTheDocument();
  });

  it('switches the usage period', () => {
    render(<EnergyUsageTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'This week' }));
    expect(screen.getByText('42.8 kWh')).toBeInTheDocument();
    expect(screen.getByText('$7.10')).toBeInTheDocument();
    expect(screen.queryByText('12.4 kWh')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'This month' }));
    expect(screen.getByText('184.6 kWh')).toBeInTheDocument();
    expect(screen.getByText('$30.20')).toBeInTheDocument();
  });
});

describe('SecurityTemplate', () => {
  it('shows the security status, cameras, and sensors', () => {
    render(<SecurityTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Security' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 cameras')).toBeInTheDocument();
    expect(screen.getByText('3 sensors')).toBeInTheDocument();
    expect(screen.getByText('Disarmed')).toBeInTheDocument();
    expect(screen.getByText('Front Door Cam')).toBeInTheDocument();
    expect(screen.getAllByText('Closed')).toHaveLength(2);
    expect(screen.getAllByText('Open')).toHaveLength(1);
    expect(screen.getByText('6 events')).toBeInTheDocument();
  });

  it('arms and disarms the security system', () => {
    render(<SecurityTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Arm system' }));
    expect(screen.getByText('Armed')).toBeInTheDocument();
    expect(screen.queryByText('Disarmed')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Disarm system' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Disarm system' }));
    expect(screen.getByText('Disarmed')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Arm system' })
    ).toBeInTheDocument();
  });
});

describe('SensorDataTemplate', () => {
  it('renders sensor stats and recent readings', () => {
    render(<SensorDataTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Sensor Data' })
    ).toBeInTheDocument();
    expect(screen.getByText('12 sensors online')).toBeInTheDocument();
    expect(screen.getByText('72.4°F')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('52 AQI')).toBeInTheDocument();
    expect(screen.getByText('6 readings')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getByText('Living Room Temp')).toBeInTheDocument();
    expect(within(table).getByText('8:41 AM')).toBeInTheDocument();
    expect(within(table).getByText('Clear')).toBeInTheDocument();
  });

  it('switches temperature units', () => {
    render(<SensorDataTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to °C' }));
    expect(screen.getByText('22.4°C')).toBeInTheDocument();
    expect(screen.queryByText('72.4°F')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Switch to °F' }));
    expect(screen.getByText('72.4°F')).toBeInTheDocument();
    expect(screen.queryByText('22.4°C')).not.toBeInTheDocument();
  });
});

describe('SmartHomeSettingsTemplate', () => {
  it('renders the settings form', () => {
    render(<SmartHomeSettingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Smart Home Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 settings')).toBeInTheDocument();
    expect(screen.getByLabelText('Home name')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Timezone')).toBeInTheDocument();
    expect(screen.getByText('Units: °F')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save settings' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Enable notifications' })
    ).toBeInTheDocument();
  });

  it('switches units and saves settings', () => {
    render(<SmartHomeSettingsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: '°C' }));
    expect(screen.getByText('Units: °C')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Enable notifications' })
    );
    expect(
      screen.getByRole('button', { name: 'Disable notifications' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Save settings' }));
    expect(screen.getByText('Settings saved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Saved' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Saved' }));
    expect(
      screen.getByRole('button', { name: 'Save settings' })
    ).toBeInTheDocument();
    expect(screen.queryByText('Settings saved')).not.toBeInTheDocument();
  });
});

describe('IotPages', () => {
  it('renders the DeviceDashboardPage', () => {
    render(<DeviceDashboardPage />);
    expect(
      screen.getByRole('heading', { name: 'Device Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 devices')).toBeInTheDocument();
  });

  it('renders the DeviceDetailPage', () => {
    render(<DeviceDetailPage />);
    expect(
      screen.getByRole('heading', { name: 'Device Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('Living Room Thermostat')).toBeInTheDocument();
  });

  it('renders the ScenesPage', () => {
    render(<ScenesPage />);
    expect(screen.getByRole('heading', { name: 'Scenes' })).toBeInTheDocument();
    expect(screen.getByText('4 scenes')).toBeInTheDocument();
  });

  it('renders the AutomationsPage', () => {
    render(<AutomationsPage />);
    expect(
      screen.getByRole('heading', { name: 'Automations' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 automations')).toBeInTheDocument();
  });

  it('renders the EnergyUsagePage', () => {
    render(<EnergyUsagePage />);
    expect(
      screen.getByRole('heading', { name: 'Energy Usage' })
    ).toBeInTheDocument();
    expect(screen.getByText('12.4 kWh')).toBeInTheDocument();
  });

  it('renders the SecurityPage', () => {
    render(<SecurityPage />);
    expect(
      screen.getByRole('heading', { name: 'Security' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 cameras')).toBeInTheDocument();
  });

  it('renders the SensorDataPage', () => {
    render(<SensorDataPage />);
    expect(
      screen.getByRole('heading', { name: 'Sensor Data' })
    ).toBeInTheDocument();
    expect(screen.getByText('12 sensors online')).toBeInTheDocument();
  });

  it('renders the SmartHomeSettingsPage', () => {
    render(<SmartHomeSettingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Smart Home Settings' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 settings')).toBeInTheDocument();
  });
});
