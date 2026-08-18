import { render } from '@testing-library/react';
import { WorldClock } from '../WorldClock';

jest.mock('../CityCard', () => ({
  CityCard: ({ label }: { label: string }) => (
    <div data-testid="city-card">{label}</div>
  ),
}));

jest.mock('@hieudoanm.github.io/data/timezones', () => ({
  timezones: [
    {
      label: 'Tokyo',
      country: 'Japan',
      lat: 35.6762,
      lon: 139.6503,
      favorite: true,
    },
    {
      label: 'London',
      country: 'United Kingdom',
      lat: 51.5074,
      lon: -0.1278,
      favorite: false,
    },
  ],
}));

describe('WorldClock', () => {
  it('should render favorite and non-favorite cities', () => {
    const { container } = render(
      <WorldClock
        times={['12:00:00', '04:00:00']}
        weatherQueries={[{ data: undefined }, { data: undefined }]}
        query=""
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should filter cities by query', () => {
    const { container } = render(
      <WorldClock
        times={['12:00:00', '04:00:00']}
        weatherQueries={[{ data: undefined }, { data: undefined }]}
        query="london"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should show empty state when no cities match', () => {
    const { container } = render(
      <WorldClock
        times={['12:00:00', '04:00:00']}
        weatherQueries={[{ data: undefined }, { data: undefined }]}
        query="xyz"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
