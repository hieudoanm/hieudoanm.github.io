import { Insights } from '@chess/common/types/chess';
import { NextRequest, NextResponse } from 'next/server';
import { getInsights } from './service';

type PlayersParameters = { params: { username: string } };

export const GET = async (
  _request: NextRequest,
  { params }: PlayersParameters
): Promise<NextResponse<Insights>> => {
  const username: string = params.username ?? '';
  const insights: Insights = await getInsights(username);
  return NextResponse.json(insights, { status: 200 });
};
