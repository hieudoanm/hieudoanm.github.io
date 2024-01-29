import { NextResponse } from 'next/server';
import { CountriesResponse, getCountries } from './service';

export const GET = async (): Promise<NextResponse<CountriesResponse>> => {
  const countriesResponse = await getCountries();
  return NextResponse.json<CountriesResponse>(countriesResponse, {
    status: 200,
  });
};
