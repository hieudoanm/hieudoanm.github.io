import { getTablebase } from '@chess/common/clients/lichess.org/lichess.client';
import { NextRequest, NextResponse } from 'next/server';

type TableBaseRequestBody = { fen: string };

export const POST = async (request: NextRequest) => {
  const body: TableBaseRequestBody = await request.json();
  const { fen = '' } = body;
  const tablebase = await getTablebase(fen);
  return NextResponse.json(tablebase, { status: 200 });
};
