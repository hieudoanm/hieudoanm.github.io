import { getWeather } from './openweathermap.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const APP_ID = 'test-app-id';

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getWeather', () => {
  const weatherResponse: Record<string, unknown> = {
    coord: { lon: 105.85, lat: 21.03 },
    weather: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    ],
    base: 'stations',
    main: {
      temp: 25.5,
      feels_like: 24.8,
      temp_min: 23.2,
      temp_max: 27.1,
      pressure: 1012,
      humidity: 65,
      sea_level: 1012,
      grnd_level: 1010,
    },
    visibility: 10000,
    wind: { speed: 3.6, deg: 120, gust: 5.1 },
    rain: { '1h': 0 },
    clouds: { all: 0 },
    dt: 1700000000,
    sys: {
      type: 1,
      id: 9308,
      country: 'VN',
      sunrise: 1700000000,
      sunset: 1700000000,
    },
    timezone: 25200,
    id: 1581130,
    name: 'Hanoi',
    cod: 200,
  };

  it('fetches weather by city query', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => weatherResponse,
    });

    const result = await getWeather(APP_ID, 'Hanoi');

    expect(result).toEqual(weatherResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=Hanoi&lang=vi&units=metric&appid=test-app-id'
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getWeather(APP_ID, 'Hanoi')).rejects.toThrow('Network error');
  });
});
