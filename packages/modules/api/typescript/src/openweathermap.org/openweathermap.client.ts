import { OpenWeather } from './openweathermap.dto.js';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (
  appId: string,
  query: string
): Promise<OpenWeather> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('q', query);
  urlSearchParams.set('lang', 'vi');
  urlSearchParams.set('units', 'metric');
  urlSearchParams.set('appid', appId);
  const weatherUrl = `${BASE_URL}/weather?${urlSearchParams.toString()}`;
  return fetch(weatherUrl).then((response) => response.json());
};
