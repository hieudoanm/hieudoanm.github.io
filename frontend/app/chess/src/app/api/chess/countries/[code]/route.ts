import { NextRequest, NextResponse } from 'next/server';
import { CountryResponse } from './model';
import { getCountry } from './service';

type CountriesParameters = { params: { code: string } };

export const GET = async (
  _request: NextRequest,
  { params }: CountriesParameters
): Promise<NextResponse<CountryResponse>> => {
  const code: string = params.code ?? '';
  const country = await getCountry(code);
  return NextResponse.json(country, { status: 200 });
};
