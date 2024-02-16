import { getStats } from '@chess/common/clients/chess.com/chess.client';
import {
  DANIEL_CHESS_USERNAME,
  HIKARU_CHESS_USERNAME,
  MAGNUS_CHESS_USERNAME,
} from '@chess/common/constants/chess.constants';
import { NextRequest, NextResponse } from 'next/server';

type PlayerParameters = { params: { username: string } };

export const GET = async (
  _request: NextRequest,
  { params }: PlayerParameters
) => {
  const username: string = params.username ?? '';
  const stats = await getStats(username);
  return NextResponse.json(stats);
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export const generateStaticParams = () => {
  return [
    { username: DANIEL_CHESS_USERNAME },
    { username: HIKARU_CHESS_USERNAME },
    { username: MAGNUS_CHESS_USERNAME },
  ];
};
