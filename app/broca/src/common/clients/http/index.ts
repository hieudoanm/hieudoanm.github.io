import axios, { AxiosRequestConfig } from 'axios';

export const get = async <T>(
  url: string,
  config: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const { data } = await axios.get<T>(url, config);
    return data;
  } catch (error) {
    console.error(error);
    return {} as T;
  }
};
