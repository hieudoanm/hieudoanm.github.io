import { CHESS_USERNAME } from '@chess/common/constants/chess.constants';
import { Insights } from '@chess/common/types/chess';
import { NextRequest, NextResponse } from 'next/server';
import { getInsights } from './service';
import { ChessTimeClass, ChessVariant } from '@prisma/client';

type PlayersParameters = { params: { username: string } };

export const GET = async (
  request: NextRequest,
  { params }: PlayersParameters
): Promise<NextResponse<Insights>> => {
  const { searchParams } = new URL(request.url);
  const variant: ChessVariant =
    (searchParams.get('variant') as ChessVariant) ?? 'chess';
  const timeClass: ChessTimeClass =
    (searchParams.get('timeClass') as ChessTimeClass) ?? 'blitz';
  const rated: boolean = (searchParams.get('rated') ?? 'true') === 'true';
  const username: string = params.username ?? '';

  const insights: Insights = await getInsights({
    username,
    variant,
    timeClass,
    rated,
  });
  return NextResponse.json<Insights>(insights, { status: 200 });
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [{ username: CHESS_USERNAME }];
};
