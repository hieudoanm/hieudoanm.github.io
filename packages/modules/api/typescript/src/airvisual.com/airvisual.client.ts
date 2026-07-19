import {
  AirQuality,
  CitiesResponse,
  CountriesResponse,
  StatesResponse,
} from './airvisual.dto.js';

const BASE_URL = 'http://api.airvisual.com/v2';

export const getCountries = async (key: string): Promise<CountriesResponse> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('key', key);
  const url = `${BASE_URL}/countries?${urlSearchParameters.toString()}`;
  return fetch(url).then((response) => response.json());
};

export const getStates = async (
  key: string,
  country: string
): Promise<StatesResponse> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('country', country);
  urlSearchParameters.set('key', key);
  const url = `${BASE_URL}/states?${urlSearchParameters.toString()}`;
  return fetch(url).then((response) => response.json());
};

export const getCities = async (
  key: string,
  { country, state }: { country: string; state: string }
): Promise<CitiesResponse> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('country', country);
  urlSearchParameters.set('state', state);
  urlSearchParameters.set('key', key);
  const url = `${BASE_URL}/cities?${urlSearchParameters.toString()}`;
  return fetch(url).then((response) => response.json());
};

export const getAirQuality = async (
  key: string,
  { country, state, city }: { country: string; state: string; city: string }
): Promise<AirQuality> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('country', country);
  urlSearchParameters.set('state', state);
  urlSearchParameters.set('city', city);
  urlSearchParameters.set('key', key);
  const url = `${BASE_URL}/city?${urlSearchParameters.toString()}`;
  return fetch(url).then((response) => response.json());
};
