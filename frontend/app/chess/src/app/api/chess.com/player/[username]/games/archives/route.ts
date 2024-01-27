import { getArchives } from '@chess/common/clients/chess.com/chess.client';
import { NextRequest, NextResponse } from 'next/server';

type PlayerParameters = { params: { username: string } };

export const GET = async (
  _request: NextRequest,
  { params }: PlayerParameters
) => {
  const username: string = params.username ?? '';
  const archives = await getArchives(username);
  return NextResponse.json(archives);
};
