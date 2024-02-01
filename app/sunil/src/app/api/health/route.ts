import { NextResponse } from 'next/server';

type HealthResponse = {
  status: string;
};

export const GET = (): NextResponse<HealthResponse> => {
  return NextResponse.json({ status: 'OK' }, { status: 500 });
};
