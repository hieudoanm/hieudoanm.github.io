import { NextResponse } from 'next/server';
import { Country } from './model';
import { getCountries } from './service';

export const GET = async (): Promise<
  NextResponse<{ total: number; countries: Country[] }>
> => {
  const countries: Country[] = await getCountries();
  const total: number = countries.length;
  return NextResponse.json({ total, countries }, { status: 200 });
};
