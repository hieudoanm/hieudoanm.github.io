import { render, screen } from '@testing-library/react';
import EnergyUsagePage from '@/app/(templates)/developer/energy/page';

describe('EnergyUsagePage', () => {
  it('renders the EnergyUsagePage', () => {
    render(<EnergyUsagePage />);
    expect(
      screen.getByRole('heading', { name: 'Energy Usage' })
    ).toBeInTheDocument();
    expect(screen.getByText('12.4 kWh')).toBeInTheDocument();
  });
});
