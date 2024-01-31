import { ChessPlayer } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getPlayer, syncPlayer } from './service';

type PlayersParameters = { params: { username: string } };

export const GET = async (
  _request: NextRequest,
  { params }: PlayersParameters
): Promise<NextResponse<ChessPlayer>> => {
  const username: string = params.username ?? '';
  const player: ChessPlayer = await getPlayer(username);
  return NextResponse.json<ChessPlayer>(player, { status: 200 });
};

export const POST = async (
  _request: NextRequest,
  { params }: PlayersParameters
): Promise<NextResponse<ChessPlayer>> => {
  const username: string = params.username ?? '';
  const player: ChessPlayer = await syncPlayer(username);
  return NextResponse.json<ChessPlayer>(player, { status: 200 });
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [{ username: 'hikaru' }];
};
