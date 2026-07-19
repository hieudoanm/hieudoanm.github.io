import { render, screen } from '@testing-library/react';
import { WeatherForecast } from '../WeatherForecast';

describe('WeatherForecast', () => {
  const days = [
    { day: 'Mon', condition: 'Sunny', high: 32, low: 25 },
    { day: 'Tue', condition: 'Rainy', high: 28, low: 22 },
  ];

  it('renders day, condition and temperature', () => {
    render(<WeatherForecast days={days} />);
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getAllByTestId('weather-temp')[0]).toHaveTextContent(
      '32° / 25°'
    );
    expect(screen.getByText('Rainy')).toBeInTheDocument();
  });

  it('renders an empty grid for no days', () => {
    const { container } = render(<WeatherForecast days={[]} />);
    expect(
      container.querySelector('[data-testid="weather-forecast"]')
    ).toBeInTheDocument();
    expect(container.querySelectorAll('div').length).toBeGreaterThan(0);
  });
});
