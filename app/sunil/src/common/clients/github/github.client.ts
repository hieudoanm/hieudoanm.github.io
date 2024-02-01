import axios from 'axios';
import { parse } from 'yaml';
import { Language, License } from './github.dto';

const BASE_URL = 'https://api.github.com';

const get = async <T>(url: string): Promise<T> => {
  const response = await axios.get<T>(url);
  return response.data;
};

export const getLanguages = async (): Promise<Language[]> => {
  const url =
    'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';
  const response = await axios.get<string>(url);
  const { data } = response;
  const languagesMap = parse(data);
  const languages = Object.keys(languagesMap).map((key) => {
    const language = languagesMap[key];
    return { ...language, language: key };
  });
  return languages;
};

export const getLicenses = async (): Promise<License[]> => {
  const url = `${BASE_URL}/licenses`;
  return get<License[]>(url);
};

export const getLicense = async (key: string): Promise<License> => {
  const url = `${BASE_URL}/licenses/${key}`;
  return get<License>(url);
};
