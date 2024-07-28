import axios from 'axios';
import { FixerLatestResponse, SymbolsResponse } from './fixer.dto';

const BASE_URL = 'http://data.fixer.io/api';

const get = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    return {} as T;
  }
};

const getLatest = (key: string) => async (): Promise<FixerLatestResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('access_key', key);
  const url = `${BASE_URL}/latest?${urlSearchParams.toString()}`;
  return get<FixerLatestResponse>(url);
};

const getSymbols = (key: string) => async (): Promise<SymbolsResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('access_key', key);
  const url = `${BASE_URL}/symbols?${urlSearchParams.toString()}`;
  return get<SymbolsResponse>(url);
};

export interface IFixerClient {
  getLatest: () => Promise<FixerLatestResponse>;
  getSymbols: () => Promise<SymbolsResponse>;
}

export const FixerClient = (key: string): IFixerClient => {
  return { getLatest: getLatest(key), getSymbols: getSymbols(key) };
};
