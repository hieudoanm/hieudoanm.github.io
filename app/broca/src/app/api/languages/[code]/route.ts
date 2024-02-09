import { logger } from '@broca/common/log';
import { Language } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { getLanguage } from './service';

type LanguageParameters = { params: { code: string } };

export const GET = async (
  _request: NextRequest,
  { params }: LanguageParameters
): Promise<NextResponse<Language>> => {
  const code: string = params.code;
  logger.info(`GET code=${code}`);
  const language = await getLanguage(code);
  return NextResponse.json<Language>(language, { status: 200 });
};
