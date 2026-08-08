import { render, screen } from '@testing-library/react';
import SensorDataPage from '@/app/(templates)/developer/sensors/page';

describe('SensorDataPage', () => {
  it('renders the SensorDataPage', () => {
    render(<SensorDataPage />);
    expect(
      screen.getByRole('heading', { name: 'Sensor Data' })
    ).toBeInTheDocument();
    expect(screen.getByText('12 sensors online')).toBeInTheDocument();
  });
});
