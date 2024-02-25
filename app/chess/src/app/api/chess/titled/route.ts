import { NextResponse } from 'next/server';
import { TitledResponse, getTitled } from './service';

export const GET = async (): Promise<NextResponse<TitledResponse>> => {
  const titledResponse = await getTitled();
  return NextResponse.json<TitledResponse>(titledResponse, {
    status: 200,
  });
};
