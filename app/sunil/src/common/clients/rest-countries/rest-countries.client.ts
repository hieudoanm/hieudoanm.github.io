import axios from 'axios';
import { Country } from './rest-countries.dto';

export const getCountries = async () => {
  const url = 'https://restcountries.com/v3.1/all';
  const { data } = await axios.get<Country[]>(url);
  return data;
};
