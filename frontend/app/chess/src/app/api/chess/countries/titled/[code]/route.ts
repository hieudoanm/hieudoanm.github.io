import { ChessTitleAbbreviation } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { CountryResponse } from './model';
import { getCountry } from './service';

type CountriesParameters = { params: { code: string } };

export const GET = async (
  request: NextRequest,
  { params }: CountriesParameters
): Promise<NextResponse<CountryResponse>> => {
  const { searchParams } = new URL(request.url);
  const title: ChessTitleAbbreviation | undefined =
    (searchParams.get('title') as ChessTitleAbbreviation) ?? undefined;

  const code: string = params.code ?? '';

  const country = await getCountry({ code, title });
  return NextResponse.json<CountryResponse>(country, { status: 200 });
};
