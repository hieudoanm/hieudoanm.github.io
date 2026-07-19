import { fireEvent, render, screen, within } from '@testing-library/react';
import { SensorDataTemplate } from '../SensorDataTemplate';

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
