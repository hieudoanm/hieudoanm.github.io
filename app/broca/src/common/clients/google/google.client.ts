import axios from 'axios';

export const getTrends = async (): Promise<Record<string, string[]>> => {
  const url: string =
    'https://trends.google.com/trends/hottrends/visualize/internal/data';
  const response = await axios.get<Record<string, string[]>>(url);
  const { data } = response;
  return data;
};
