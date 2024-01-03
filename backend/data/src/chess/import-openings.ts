import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import csv from 'csvtojson';

type Opening = { eco: string; name: string; pgn: string };

const main = async () => {
  const prismaService = new PrismaClient();
  const letters = ['a', 'b', 'c', 'd', 'e'];
  const base =
    'https://raw.githubusercontent.com/lichess-org/chess-openings/master';
  for (const letter of letters) {
    const url = `${base}/${letter}.tsv`;
    const response = await axios.get<string>(url);
    const { data } = response;
    const openings: Opening[] = await csv({ delimiter: '\t' }).fromString(data);
    for (const { eco, name, pgn } of openings) {
      const body = { eco, name, pgn };
      console.info(`eco=${eco} name=${name} pgn=${pgn}`);
      await prismaService.chessOpening.upsert({
        create: body,
        update: body,
        where: { eco_name_pgn: { eco, name, pgn } },
      });
    }
  }
};

main();
