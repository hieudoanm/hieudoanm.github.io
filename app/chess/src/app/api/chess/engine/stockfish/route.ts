import { analyse } from '@chess/common/clients/stockfish/stockfish.client';
import { NextRequest, NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json({ engine: 'Stockfish' }, { status: 200 });
};

type StockfishRequestBody = { fen: string; variations: number };

export const POST = async (request: NextRequest) => {
  const body: StockfishRequestBody = await request.json();
  const { fen = '', variations = 10 } = body;
  const topMoves = await analyse(fen, variations);
  return NextResponse.json({ fen, topMoves }, { status: 200 });
};
