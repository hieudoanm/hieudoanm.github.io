import axios from 'axios';
import { Weather } from './open-weather-map.dto';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export class OpenWeatherMapClient {
  private apiKey = '';

  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey;
  }

  private async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
  }

  public async getWeather(query: string): Promise<Weather> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('q', query);
    urlSearchParams.set('lang', 'vi');
    urlSearchParams.set('units', 'metric');
    urlSearchParams.set('appid', this.apiKey);
    const weatherUrl = `${BASE_URL}/weather?${urlSearchParams.toString()}`;
    return this.get<Weather>(weatherUrl);
  }
}
