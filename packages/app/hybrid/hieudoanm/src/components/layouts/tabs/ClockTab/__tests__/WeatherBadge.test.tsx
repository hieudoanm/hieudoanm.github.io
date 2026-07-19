import { render } from '@testing-library/react';
import { WeatherBadge } from '../WeatherBadge';

describe('WeatherBadge', () => {
  it('should render loading state when no weather', () => {
    const { container } = render(<WeatherBadge weather={undefined} />);
    expect(container).toMatchSnapshot();
  });

  it('should render temperature and description', () => {
    const { container } = render(
      <WeatherBadge weather={{ temperature_2m: 22, weather_code: 0 } as any} />
    );
    expect(container).toMatchSnapshot();
  });
});
