import { NextRequest, NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json({ engine: 'Stockfish' }, { status: 200 });
};

type StockfishRequestBody = { fen: string };

export const POST = async (request: NextRequest) => {
  const body: StockfishRequestBody = await request.json();
  const { fen = '' } = body;
  return NextResponse.json({ fen }, { status: 200 });
};
