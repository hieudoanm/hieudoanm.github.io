import { render, screen } from '@testing-library/react';
import { CityCard } from '../CityCard';

describe('CityCard', () => {
  it('renders city label and country', () => {
    render(
      <CityCard
        label="Tokyo"
        country="Japan"
        time="12:30:45"
        weather={undefined}
        index={0}
      />
    );
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
  });

  it('renders time with colons', () => {
    render(
      <CityCard
        label="Tokyo"
        country="Japan"
        time="12:30:45"
        weather={undefined}
        index={0}
      />
    );
    const colons = screen.getAllByText(':');
    expect(colons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders weather badge', () => {
    render(
      <CityCard
        label="Tokyo"
        country="Japan"
        time="12:30:45"
        weather={{ temperature_2m: 25, weather_code: 0 }}
        index={0}
      />
    );
    expect(screen.getByText('25°C')).toBeInTheDocument();
  });
});
