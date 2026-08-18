import { render } from '@testing-library/react';
import { CityCard } from '../CityCard';

describe('CityCard', () => {
  it('should render with label and time', () => {
    const { container } = render(
      <CityCard
        label="Tokyo"
        country="Japan"
        time="12:30:45"
        weather={undefined}
        index={0}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with weather data', () => {
    const { container } = render(
      <CityCard
        label="London"
        country="United Kingdom"
        time="08:15:00"
        weather={{ temperature_2m: 15, weather_code: 3 } as any}
        index={1}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
