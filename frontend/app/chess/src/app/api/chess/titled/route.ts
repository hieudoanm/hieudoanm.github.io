import { TITLES } from '@chess/common/constants/chess.constants';
import { ChessTitle } from '@prisma/client';
import { NextResponse } from 'next/server';

export const GET = (): NextResponse<ChessTitle[]> => {
  return NextResponse.json<ChessTitle[]>(TITLES, { status: 200 });
};
