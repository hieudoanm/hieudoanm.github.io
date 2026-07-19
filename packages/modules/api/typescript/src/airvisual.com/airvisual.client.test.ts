import {
  getCountries,
  getStates,
  getCities,
  getAirQuality,
} from './airvisual.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const API_KEY = 'test-api-key';

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getCountries', () => {
  const countriesResponse = {
    status: 'success',
    data: [{ country: 'Vietnam' }, { country: 'USA' }],
  };

  it('fetches countries with api key', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => countriesResponse,
    });

    const result = await getCountries(API_KEY);

    expect(result).toEqual(countriesResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://api.airvisual.com/v2/countries?key=test-api-key'
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getCountries(API_KEY)).rejects.toThrow('Network error');
  });
});

describe('getStates', () => {
  const statesResponse = {
    status: 'success',
    data: [{ state: 'California' }, { state: 'Texas' }],
  };

  it('fetches states by country with api key', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => statesResponse,
    });

    const result = await getStates(API_KEY, 'USA');

    expect(result).toEqual(statesResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://api.airvisual.com/v2/states?country=USA&key=test-api-key'
    );
  });
});

describe('getCities', () => {
  const citiesResponse = {
    status: 'success',
    data: [{ city: 'Los Angeles' }, { city: 'San Francisco' }],
  };

  it('fetches cities by country and state with api key', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => citiesResponse,
    });

    const result = await getCities(API_KEY, {
      country: 'USA',
      state: 'California',
    });

    expect(result).toEqual(citiesResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://api.airvisual.com/v2/cities?country=USA&state=California&key=test-api-key'
    );
  });
});

describe('getAirQuality', () => {
  const airQualityResponse = {
    status: 'success',
    data: {
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      location: { type: 'Point', coordinates: [-118.24, 34.05] },
      forecasts: [],
      current: {
        weather: {
          ts: '2025-01-01T00:00:00.000Z',
          tp: 25,
          pr: 1012,
          hu: 60,
          ws: 3.6,
          wd: 180,
          ic: '01d',
        },
        pollution: {
          ts: '2025-01-01T00:00:00.000Z',
          aqius: 42,
          mainus: 'pm25',
          aqicn: 30,
          maincn: 'pm25',
          p2: { conc: 12, aqius: 42, aqicn: 30 },
          p1: { conc: 20, aqius: 25, aqicn: 18 },
          o3: { conc: 30, aqius: 30, aqicn: 25 },
          n2: { conc: 10, aqius: 20, aqicn: 15 },
          s2: { conc: 5, aqius: 10, aqicn: 8 },
          co: { conc: 300, aqius: 15, aqicn: 10 },
        },
      },
      history: { weather: [], pollution: [] },
    },
  };

  it('fetches air quality by country, state, and city with api key', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => airQualityResponse,
    });

    const result = await getAirQuality(API_KEY, {
      country: 'USA',
      state: 'California',
      city: 'Los Angeles',
    });

    expect(result).toEqual(airQualityResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'http://api.airvisual.com/v2/city?country=USA&state=California&city=Los+Angeles&key=test-api-key'
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(
      getAirQuality(API_KEY, {
        country: 'USA',
        state: 'California',
        city: 'Los Angeles',
      })
    ).rejects.toThrow('Network error');
  });
});
