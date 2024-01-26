import { NextRequest, NextResponse } from 'next/server';
import { OpeningsResponse, getOpenings } from './service';

export const GET = async (
  request: NextRequest
): Promise<NextResponse<OpeningsResponse>> => {
  const { searchParams } = new URL(request.url);
  const eco: string | undefined = searchParams.get('eco') ?? undefined;
  const { total = 0, openings = [] } = await getOpenings(eco);
  return NextResponse.json({ total, openings }, { status: 200 });
};
