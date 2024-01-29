import { ChessTitleAbbreviation } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { Country } from './model';
import { getTitledCountries } from './service';

export type CountriesResponse = { total: number; countries: Country[] };

export const GET = async (
  request: NextRequest
): Promise<NextResponse<CountriesResponse>> => {
  const { searchParams } = new URL(request.url);
  const title: ChessTitleAbbreviation | undefined =
    (searchParams.get('title') as ChessTitleAbbreviation) ?? undefined;

  const titledCountries: Country[] = await getTitledCountries({ title });
  const total: number = titledCountries.length;

  return NextResponse.json<CountriesResponse>(
    { total, countries: titledCountries },
    { status: 200 }
  );
};
