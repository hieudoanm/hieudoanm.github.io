import { getCountries } from '@sunil/common/clients/rest-countries/rest-countries.client';
import { Country } from '@sunil/common/clients/rest-countries/rest-countries.dto';
import { NextResponse } from 'next/server';

type CountriesResponse = { total: number; countries: Country[] };

export const GET = async () => {
  const countries: Country[] = await getCountries();
  const total = countries.length;
  return NextResponse.json<CountriesResponse>(
    { total, countries },
    { status: 200 }
  );
};
