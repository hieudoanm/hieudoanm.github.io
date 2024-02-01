import { FIXER_ACCESS_KEY } from '@sunil/common/environments/environments';
import axios from 'axios';
import { FixerLatestResponse, SymbolsResponse } from './fixer.dto';

const BASE_URL = 'http://data.fixer.io/api';

const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const getLatest = async (): Promise<FixerLatestResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('access_key', FIXER_ACCESS_KEY);
  const url = `${BASE_URL}/latest?${urlSearchParams.toString()}`;
  return get<FixerLatestResponse>(url);
};

export const getSymbols = async (): Promise<SymbolsResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('access_key', FIXER_ACCESS_KEY);
  const url = `${BASE_URL}/symbols?${urlSearchParams.toString()}`;
  return get<SymbolsResponse>(url);
};
