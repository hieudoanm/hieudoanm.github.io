import axios from 'axios';
import {
  AirQuality,
  CitiesResponse,
  CountriesResponse,
  StatesResponse,
} from './air-visual.dto';

const AIR_VISUAL_KEY = process.env.AIR_VISUAL_KEY ?? '';

const BASE_URL = 'http://api.airvisual.com/v2';

const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const getCountries = async (): Promise<CountriesResponse> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('key', AIR_VISUAL_KEY);
  const url = `${BASE_URL}/countries?${urlSearchParameters.toString()}`;
  return get<CountriesResponse>(url);
};

export const getStates = async (country: string): Promise<StatesResponse> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('country', country);
  urlSearchParameters.set('key', AIR_VISUAL_KEY);
  const url = `${BASE_URL}/states?${urlSearchParameters.toString()}`;
  return get<StatesResponse>(url);
};

export const getCities = async ({
  country,
  state,
}: {
  country: string;
  state: string;
}): Promise<CitiesResponse> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('country', country);
  urlSearchParameters.set('state', state);
  urlSearchParameters.set('key', AIR_VISUAL_KEY);
  const url = `${BASE_URL}/cities?${urlSearchParameters.toString()}`;
  return get<CitiesResponse>(url);
};

export const getAirQuality = async ({
  country,
  state,
  city,
}: {
  country: string;
  state: string;
  city: string;
}): Promise<AirQuality> => {
  const urlSearchParameters = new URLSearchParams();
  urlSearchParameters.set('country', country);
  urlSearchParameters.set('state', state);
  urlSearchParameters.set('city', city);
  urlSearchParameters.set('key', AIR_VISUAL_KEY);
  const url = `${BASE_URL}/city?${urlSearchParameters.toString()}`;
  return get<AirQuality>(url);
};
