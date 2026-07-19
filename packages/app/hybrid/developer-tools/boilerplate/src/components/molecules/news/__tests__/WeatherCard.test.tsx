import { render, screen } from '@testing-library/react';
import { WeatherCard } from '../WeatherCard';

describe('WeatherCard', () => {
  it('renders city, temperature and condition', () => {
    render(<WeatherCard city="Hanoi" temperature={28} condition="Sunny" />);
    expect(screen.getByText('Hanoi')).toBeInTheDocument();
    expect(screen.getByText('28°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });

  it('renders temperature in Fahrenheit when unit is F', () => {
    render(
      <WeatherCard city="NYC" temperature={72} unit="F" condition="Clear" />
    );
    expect(screen.getByText('72°F')).toBeInTheDocument();
  });

  it('renders high, low and humidity when provided', () => {
    render(
      <WeatherCard
        city="Paris"
        temperature={20}
        condition="Cloudy"
        high={24}
        low={16}
        humidity={65}
      />
    );
    expect(screen.getByText('24°C')).toBeInTheDocument();
    expect(screen.getByText('16°C')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('does not render detail labels when metrics are absent', () => {
    render(<WeatherCard city="Rome" temperature={30} condition="Hot" />);
    expect(screen.queryByText('Humidity')).not.toBeInTheDocument();
    expect(screen.queryByText('High')).not.toBeInTheDocument();
  });
});
