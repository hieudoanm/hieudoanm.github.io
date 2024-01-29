import { NextResponse } from 'next/server';
import { Country } from './model';
import { getTitledCountries } from './service';

export type CountriesResponse = { total: number; countries: Country[] };

export const GET = async (): Promise<NextResponse<CountriesResponse>> => {
  const titledCountries: Country[] = await getTitledCountries();
  const total: number = titledCountries.length;
  return NextResponse.json<CountriesResponse>(
    { total, countries: titledCountries },
    { status: 200 }
  );
};
