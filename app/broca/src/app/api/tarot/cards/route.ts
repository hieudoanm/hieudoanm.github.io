import { TarotCard, TarotCardSuit, TarotCardType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getTarotCards } from './service';

const resolveQuery = (searchParameters: URLSearchParams) => {
  const suit: TarotCardSuit =
    (searchParameters.get('suit') as TarotCardSuit) ?? '';
  const type: TarotCardType =
    (searchParameters.get('type') as TarotCardType) ?? '';

  return { suit, type };
};

type TarotCardsResponse = {
  total: number;
  cards: TarotCard[];
};

export const GET = async (
  request: NextRequest
): Promise<NextResponse<TarotCardsResponse>> => {
  const { searchParams } = new URL(request.url);
  const { type, suit } = resolveQuery(searchParams);

  const { total = 0, cards = [] } = await getTarotCards({ type, suit });

  return NextResponse.json<TarotCardsResponse>(
    { total, cards },
    { status: 200 }
  );
};
