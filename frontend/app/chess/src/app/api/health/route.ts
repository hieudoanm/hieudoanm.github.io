import { NextResponse } from 'next/server';

type HealthResponse = { status: string };

export const GET = (): NextResponse<HealthResponse> => {
  return NextResponse.json<HealthResponse>({ status: 'OK' }, { status: 500 });
};
