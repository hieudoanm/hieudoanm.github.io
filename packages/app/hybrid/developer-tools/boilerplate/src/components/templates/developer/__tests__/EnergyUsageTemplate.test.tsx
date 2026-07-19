import { fireEvent, render, screen } from '@testing-library/react';
import { EnergyUsageTemplate } from '../EnergyUsageTemplate';

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
