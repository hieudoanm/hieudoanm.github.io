import { getStats } from '@chess/common/clients/chess.com/chess.client';
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
  return [{ username: 'hikaru' }];
};
