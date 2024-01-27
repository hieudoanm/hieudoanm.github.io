import { getPlayer } from '@chess/common/clients/chess.com/chess.client';
import { NextRequest, NextResponse } from 'next/server';

type PlayerParameters = { params: { username: string } };

export const GET = async (
  _request: NextRequest,
  { params }: PlayerParameters
) => {
  const username: string = params.username ?? '';
  const player = await getPlayer(username);
  return NextResponse.json(player);
};
