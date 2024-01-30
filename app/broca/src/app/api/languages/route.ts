import { getPrismaClient } from '@broca/common/prisma/prisma.client';
import { Language, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

type LanguagesResponse = { total: number; languages: Language[] };

export const GET = async (): Promise<NextResponse<LanguagesResponse>> => {
  const prismaClient: PrismaClient = getPrismaClient();
  const [total = 0, languages = []] = await prismaClient.$transaction([
    prismaClient.language.count(),
    prismaClient.language.findMany(),
  ]);
  return NextResponse.json<LanguagesResponse>(
    { total, languages },
    { status: 200 }
  );
};
