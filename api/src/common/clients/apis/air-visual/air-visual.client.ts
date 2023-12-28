import axios from 'axios';
import {
  AirQuality,
  CitiesResponse,
  CountriesResponse,
  StatesResponse,
} from './air-visual.dto';

const BASE_URL = 'http://api.airvisual.com/v2';

export class AirVisualClient {
  private apiKey = '';

  constructor({ apiKey = '' }: { apiKey: string }) {
    this.apiKey = apiKey;
  }

  private async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(url);
    return response.data;
  }

  public async getCountries(): Promise<CountriesResponse> {
    const url = `${BASE_URL}/countries?key=${this.apiKey}`;
    return this.get<CountriesResponse>(url);
  }

  public async getStates(country: string): Promise<StatesResponse> {
    const url = `${BASE_URL}/states?country=${country}&key=${this.apiKey}`;
    return this.get<StatesResponse>(url);
  }

  public async getCities(
    country: string,
    state: string
  ): Promise<CitiesResponse> {
    const url = `${BASE_URL}/cities?country=${country}&state=${state}&key=${this.apiKey}`;
    return this.get<CitiesResponse>(url);
  }

  public async getAirQuality(
    country: string,
    state: string,
    city: string
  ): Promise<AirQuality> {
    const url = `${BASE_URL}/city?country=${country}&state=${state}&city=${city}&key=${this.apiKey}`;
    return this.get<AirQuality>(url);
  }
}

export * from './air-visual.dto';
export default AirVisualClient;
