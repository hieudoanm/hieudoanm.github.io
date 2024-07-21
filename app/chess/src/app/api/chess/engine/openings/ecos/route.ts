import { NextResponse } from 'next/server';
import { EcosResponse, getECOs } from './service';

export const GET = async (): Promise<NextResponse<EcosResponse>> => {
  const ecosResponse = await getECOs();
  return NextResponse.json<EcosResponse>(ecosResponse, { status: 200 });
};
