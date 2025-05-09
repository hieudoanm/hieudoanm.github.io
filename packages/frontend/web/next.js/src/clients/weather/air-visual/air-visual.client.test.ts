import axios from 'axios';
import {
  AirQuality,
  CitiesResponse,
  CountriesResponse,
  getAirQuality,
  getCities,
  getCountries,
  getStates,
  StatesResponse,
} from '.';

describe('AirVisualClient', () => {
  describe('getCountries', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await getCountries();
      expect(data).toEqual({} as CountriesResponse);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getCountries();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getStates', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await getStates('country');
      expect(data).toEqual({} as StatesResponse);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getStates('country');
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getCities', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await getCities({ country: 'country', state: 'state' });
      expect(data).toEqual({} as CitiesResponse);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getCities({ country: 'country', state: 'state' });
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getAirQuality', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await getAirQuality({
        country: 'country',
        state: 'state',
        city: 'city',
      });
      expect(data).toEqual({} as AirQuality);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getAirQuality({
          country: 'country',
          state: 'state',
          city: 'city',
        });
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
