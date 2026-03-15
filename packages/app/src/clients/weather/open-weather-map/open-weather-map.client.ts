import { OpenWeather } from './open-weather-map.dto';

const OPEN_WEATHER_MAP_APP_ID = process.env.OPEN_WEATHER_MAP_APP_ID ?? '';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (query: string): Promise<OpenWeather> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('q', query);
  urlSearchParams.set('lang', 'vi');
  urlSearchParams.set('units', 'metric');
  urlSearchParams.set('appid', OPEN_WEATHER_MAP_APP_ID);
  const weatherUrl = `${BASE_URL}/weather?${urlSearchParams.toString()}`;
  return fetch(weatherUrl).then((response) => response.json());
};
