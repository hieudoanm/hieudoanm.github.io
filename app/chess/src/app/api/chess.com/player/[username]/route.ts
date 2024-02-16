import { getPlayer } from '@chess/common/clients/chess.com/chess.client';
import { Player } from '@chess/common/clients/chess.com/chess.dto';
import {
  DANIEL_CHESS_USERNAME,
  HIKARU_CHESS_USERNAME,
  MAGNUS_CHESS_USERNAME,
  TUAN_CHESS_USERNAME,
} from '@chess/common/constants/chess.constants';
import { NextRequest, NextResponse } from 'next/server';

type PlayerParameters = { params: { username: string } };

export const GET = async (
  _request: NextRequest,
  { params }: PlayerParameters
): Promise<NextResponse<Player>> => {
  const username: string = params.username ?? '';
  const player = await getPlayer(username);
  return NextResponse.json<Player>(player, { status: 200 });
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [
    { username: DANIEL_CHESS_USERNAME },
    { username: HIKARU_CHESS_USERNAME },
    { username: MAGNUS_CHESS_USERNAME },
    { username: TUAN_CHESS_USERNAME },
  ];
};
