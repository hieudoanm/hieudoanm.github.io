import { render, screen } from '@testing-library/react';
import { WeatherBadge } from '../WeatherBadge';

describe('WeatherBadge', () => {
  it('shows loading state when no weather data', () => {
    render(<WeatherBadge weather={undefined} />);
    expect(screen.getByText('…')).toBeInTheDocument();
  });

  it('shows temperature and mapped weather text', () => {
    render(<WeatherBadge weather={{ temperature_2m: 22, weather_code: 0 }} />);
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
  });

  it('shows negative temperature', () => {
    render(<WeatherBadge weather={{ temperature_2m: -5, weather_code: 71 }} />);
    expect(screen.getByText('-5°C')).toBeInTheDocument();
  });
});
