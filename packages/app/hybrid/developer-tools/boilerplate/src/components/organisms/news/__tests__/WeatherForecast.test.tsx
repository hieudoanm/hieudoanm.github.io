import { render, screen } from '@testing-library/react';
import { WeatherForecast } from '../WeatherForecast';

const days = [
  { day: 'Mon', condition: 'Sunny', high: 28, low: 18, icon: '\u2600\uFE0F' },
  { day: 'Tue', condition: 'Rain', high: 21, low: 14, icon: '\u{1F327}\uFE0F' },
];

describe('WeatherForecast', () => {
  it('renders forecast cards with temperatures', () => {
    render(<WeatherForecast days={days} />);
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText(/28/)).toBeInTheDocument();
    expect(screen.getByText(/18/)).toBeInTheDocument();
  });

  it('renders conditions and icons', () => {
    render(<WeatherForecast days={days} />);
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByLabelText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('Rain')).toBeInTheDocument();
  });

  it('renders the section title', () => {
    render(<WeatherForecast days={days} title="This Week" />);
    expect(screen.getByText('This Week')).toBeInTheDocument();
  });

  it('handles an empty days list', () => {
    render(<WeatherForecast days={[]} />);
    expect(screen.getByTestId('weather-forecast')).toBeInTheDocument();
    expect(screen.queryAllByRole('article')).toHaveLength(0);
  });
});
