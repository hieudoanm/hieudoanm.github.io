import { fireEvent, render, screen } from '@testing-library/react';
import { SmartHomeSettingsTemplate } from '../SmartHomeSettingsTemplate';

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
