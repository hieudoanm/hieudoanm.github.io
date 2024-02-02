import axios from 'axios';
import { CoinRankingResponse } from './coinranking.dto';

const BASE_URL = 'https://api.coinranking.com';

const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const getCoins = (): Promise<CoinRankingResponse> => {
  const url = `${BASE_URL}/v2/coins`;
  return get(url);
};
