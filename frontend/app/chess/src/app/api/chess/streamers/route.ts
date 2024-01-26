import { ChessTitle } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getStreamers } from './service';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const country: string | undefined = searchParams.get('country') ?? undefined;
  const title: ChessTitle | undefined =
    (searchParams.get('title') as ChessTitle) ?? undefined;
  const {
    total = 0,
    countries = [],
    players = [],
  } = await getStreamers({ country, title });

  return NextResponse.json({ total, countries, players });
};
