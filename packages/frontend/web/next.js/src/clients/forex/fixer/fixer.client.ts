import { FixerLatestResponse, SymbolsResponse } from './fixer.dto';

const BASE_URL = 'http://data.fixer.io/api';

const getLatest = (key: string) => async (): Promise<FixerLatestResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('access_key', key);
  const url = `${BASE_URL}/latest?${urlSearchParams.toString()}`;
  return fetch(url).then((response) => response.json());
};

const getSymbols = (key: string) => async (): Promise<SymbolsResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('access_key', key);
  const url = `${BASE_URL}/symbols?${urlSearchParams.toString()}`;
  return fetch(url).then((response) => response.json());
};

export interface IFixerClient {
  getLatest: () => Promise<FixerLatestResponse>;
  getSymbols: () => Promise<SymbolsResponse>;
}

export const FixerClient = (key: string): IFixerClient => {
  return { getLatest: getLatest(key), getSymbols: getSymbols(key) };
};
