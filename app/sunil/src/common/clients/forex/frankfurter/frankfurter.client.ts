import axios from 'axios';
import {
  CurrenciesResponse,
  FrankfurterLatestRequest,
  FrankfurterLatestResponse,
} from './frankfurter.dto';

const BASE_URL: string = 'https://api.frankfurter.app';

const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const getLatest = async (
  { amount = 1, base = 'EUR', to = [] }: FrankfurterLatestRequest = {
    amount: 1,
    base: 'EUR',
    to: [],
  }
): Promise<FrankfurterLatestResponse> => {
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('amount', amount.toString());
  urlSearchParams.set('from', base);
  if (to.length > 0) {
    urlSearchParams.set('to', to.join(','));
  }
  const url = `${BASE_URL}/latest?${urlSearchParams.toString()}`;
  return get(url);
};

export const getCurrencies = async (): Promise<CurrenciesResponse> => {
  const url = `${BASE_URL}/currencies`;
  return get<CurrenciesResponse>(url);
};
