import { fireEvent, render, screen } from '@testing-library/react';
import { DeviceDetailTemplate } from '../DeviceDetailTemplate';

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
