import { logger } from '@broca/common/log';
import { TarotCard } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getTarotCard } from './service';

type TarotCardParameters = { params: { id: string } };

export const GET = async (
  _request: NextRequest,
  { params }: TarotCardParameters
): Promise<NextResponse<TarotCard>> => {
  const id: string = params.id;
  logger.info(`GET id=${id}`);
  const language = await getTarotCard(id);
  return NextResponse.json<TarotCard>(language, { status: 200 });
};
