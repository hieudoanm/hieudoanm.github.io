import { OPEN_WEATHER_MAP_APP_ID } from '@sunil/common/environments/environments';
import axios from 'axios';
import { Weather } from './open-weather-map.dto';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const getWeather = async (query: string): Promise<Weather> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('q', query);
  urlSearchParams.set('lang', 'vi');
  urlSearchParams.set('units', 'metric');
  urlSearchParams.set('appid', OPEN_WEATHER_MAP_APP_ID);
  const weatherUrl = `${BASE_URL}/weather?${urlSearchParams.toString()}`;
  return get<Weather>(weatherUrl);
};
