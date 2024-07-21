import { analysePGN } from '@chess/common/clients/stockfish/stockfish.client';
import { NextRequest, NextResponse } from 'next/server';

type StockfishRequestBody = { pgn: string };

export const POST = async (request: NextRequest) => {
  const body: StockfishRequestBody = await request.json();
  const { pgn = '' } = body;
  const moves = await analysePGN(pgn);
  return NextResponse.json(moves, { status: 200 });
};
