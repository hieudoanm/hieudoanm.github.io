import { NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json({ engine: 'Stockfish' }, { status: 200 });
};
