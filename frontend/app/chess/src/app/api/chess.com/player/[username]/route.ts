import { getPlayer } from '@chess/common/clients/chess.com/chess.client';
import { Player } from '@chess/common/clients/chess.com/chess.dto';
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
