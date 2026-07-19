import { render, screen } from '@testing-library/react';
import { WeatherIcon } from '../WeatherIcon';

describe('WeatherIcon', () => {
  it('renders the emoji for the condition', () => {
    render(<WeatherIcon condition="rain" />);
    expect(screen.getByTestId('weather-icon')).toHaveTextContent('🌧️');
  });

  it('renders the temperature when provided', () => {
    render(<WeatherIcon condition="sunny" temperature={28} />);
    expect(screen.getByTestId('weather-icon')).toHaveTextContent('28°');
  });

  it('omits the temperature when not provided', () => {
    render(<WeatherIcon condition="cloudy" />);
    expect(screen.getByTestId('weather-icon')).not.toHaveTextContent('°');
  });

  it('renders a negative temperature', () => {
    render(<WeatherIcon condition="snow" temperature={-5} />);
    expect(screen.getByTestId('weather-icon')).toHaveTextContent('-5°');
  });
});
