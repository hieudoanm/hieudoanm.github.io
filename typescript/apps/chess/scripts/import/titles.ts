import { ChessTitleAbbreviation, PrismaClient } from '@prisma/client';
import { exit } from 'node:process';

const TITLED_ABBREVIATIONS: Record<ChessTitleAbbreviation, string> = {
  GM: 'Grand Master',
  IM: 'International Master',
  FM: 'FIDE Master',
  CM: 'Candidate Master',
  NM: 'National Master',
  WGM: 'Woman Grand Master',
  WIM: 'Woman International Master',
  WFM: 'Woman FIDE Master',
  WCM: 'Woman Candidate Master',
  WNM: 'Woman National Master',
  AGM: 'Arena Grand Master',
  AIM: 'Arena International Master',
  AFM: 'Arena FIDE Master',
  ACM: 'Arena Candidate Master',
};

const main = async () => {
  const prismaClient = new PrismaClient();

  for (const [abbreviation, title] of Object.entries(TITLED_ABBREVIATIONS)) {
    const body = {
      abbreviation: abbreviation as ChessTitleAbbreviation,
      title,
    };
    console.log({ abbreviation, title });
    await prismaClient.chessTitle.upsert({
      create: body,
      update: body,
      where: { abbreviation: abbreviation as ChessTitleAbbreviation },
    });
  }
  await prismaClient.$disconnect();

  exit(0);
};

main();
