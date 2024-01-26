import { NextResponse } from 'next/server';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

type HealthResponse = { status: string };

export const GET = (): NextResponse<HealthResponse> => {
  return NextResponse.json<HealthResponse>({ status: 'OK' }, { status: 500 });
};
