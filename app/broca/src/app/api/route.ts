import { NextResponse } from 'next/server';

type LanguagesResponse = { status: string };

export const GET = async (): Promise<NextResponse<LanguagesResponse>> => {
  return NextResponse.json<LanguagesResponse>(
    { status: 'OK' },
    { status: 200 }
  );
};
