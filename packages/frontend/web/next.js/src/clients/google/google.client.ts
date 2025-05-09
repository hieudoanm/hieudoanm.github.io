import axios, { AxiosResponse } from 'axios';

export const getTrends = async (): Promise<Record<string, string[]>> => {
  try {
    const url: string = `https://trends.google.com/trends/hottrends/visualize/internal/data`;
    const response: AxiosResponse<Record<string, string[]>> =
      await axios.get<Record<string, string[]>>(url);
    const { data } = response;
    return data;
  } catch (error) {
    console.error(`getTrends error=${error}`);
    return {};
  }
};
