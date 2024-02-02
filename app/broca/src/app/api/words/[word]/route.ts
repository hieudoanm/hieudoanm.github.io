import { logger } from '@broca/common/log';
import { Word } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getWord } from './service';

type WordParameters = { params: { word: string } };

export const GET = async (
  _request: NextRequest,
  { params }: WordParameters
): Promise<NextResponse<Word>> => {
  const word: string = params.word;
  logger.info(`GET word=${word}`);
  const language = await getWord(word);
  return NextResponse.json<Word>(language, { status: 200 });
};
