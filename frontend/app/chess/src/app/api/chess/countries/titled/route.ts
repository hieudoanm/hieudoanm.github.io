import { NextResponse } from 'next/server';
import { Country } from './model';
import { getCountries } from './service';

export type CountriesResponse = { total: number; countries: Country[] };

export const GET = async (): Promise<NextResponse<CountriesResponse>> => {
  const countries: Country[] = await getCountries();
  const total: number = countries.length;
  return NextResponse.json<CountriesResponse>(
    { total, countries },
    { status: 200 }
  );
};
