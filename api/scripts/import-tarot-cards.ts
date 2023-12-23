import axios from 'axios';
import { PrismaService } from '../src/common/prisma/prisma.service';
import { TarotCardType } from '@prisma/client';

type Card = {
  name: string;
  name_short: string;
  value: string;
  value_int: number;
  type: string;
  suit: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
};

const main = async () => {
  const prismaService = new PrismaService();
  const url = 'https://tarotapi.dev/api/v1/cards';
  const response = await axios.get<{ nhits: number; cards: Card[] }>(url);
  const { data } = response;
  const { cards = [] } = data;
  for (const card of cards) {
    const {
      name,
      name_short: id,
      value,
      value_int: valueInt,
      type,
      suit,
      meaning_up: meaningUp,
      meaning_rev: meaningReverse,
      desc: description,
    } = card;
    console.log('id', id);
    const body = {
      id,
      name,
      value,
      valueInt,
      type: type.toUpperCase() as TarotCardType,
      suit,
      meaningUp,
      meaningReverse,
      description,
    };
    await prismaService.tarotCard.upsert({
      create: body,
      update: body,
      where: { id },
    });
  }
};

main();
