import { render, screen } from '@solidjs/testing-library';
import { CityCard, WeatherBadge } from '../CityCard';

describe('WeatherBadge', () => {
  it('renders temperature and weather text when weather is provided', () => {
    const weather = { temperature_2m: 25, weather_code: 0 };
    render(() => <WeatherBadge weather={weather} />);
    expect(screen.getByText(/25/)).toBeInTheDocument();
  });

  it('renders fallback when weather is undefined', () => {
    render(() => <WeatherBadge weather={undefined} />);
    expect(screen.getByText('…')).toBeInTheDocument();
  });
});

describe('CityCard', () => {
  const defaultProps = {
    label: 'Tokyo',
    time: '14:30:45',
    weather: undefined,
    index: 0,
  };

  it('renders the city label', () => {
    render(() => <CityCard {...defaultProps} />);
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
  });

  it('renders hours part of the time', () => {
    render(() => <CityCard {...defaultProps} />);
    const allText = document.body.textContent || '';
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('renders WeatherBadge when weather is provided', () => {
    const weather = { temperature_2m: 30, weather_code: 800 };
    render(() => <CityCard {...defaultProps} weather={weather} />);
    const badge = screen.getByText(
      (content) => content.includes('30') && content.includes('°C')
    );
    expect(badge).toBeInTheDocument();
  });

  it('renders fallback WeatherBadge when weather is undefined', () => {
    render(() => <CityCard {...defaultProps} />);
    expect(screen.getByText('…')).toBeInTheDocument();
  });

  it('renders multiple city cards with different indices', () => {
    render(() => (
      <>
        <CityCard label="Tokyo" time="10:00:00" weather={undefined} index={0} />
        <CityCard
          label="London"
          time="15:00:00"
          weather={undefined}
          index={1}
        />
      </>
    ));
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
  });
});
