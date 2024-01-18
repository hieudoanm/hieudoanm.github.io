import { PrismaClient } from '@prisma/client';
import axios from 'axios';

type QuotesResponse = {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  results: Quote[];
};

type Quote = {
  _id: string;
  author: string;
  authorSlug: string;
  content: string;
  tags: string[];
};

const main = async () => {
  const baseUrl = 'https://api.quotable.io';
  const prismaService = new PrismaClient();
  await prismaService.$connect();
  const limit = 150;
  const url = `${baseUrl}/quotes?page=1&limit=${limit}`;
  const response = await axios.get<QuotesResponse>(url);
  const { data } = response;
  const { page = 1, totalPages = 0 } = data;
  for (let i = page; i <= totalPages; i++) {
    console.info(`page=${i}`);
    const url = `${baseUrl}/quotes?page=${i}&limit=${limit}`;
    const response = await axios.get<QuotesResponse>(url);
    const { data } = response;
    const { results = [] } = data;
    for (const result of results) {
      const { _id: id, author, authorSlug, content, tags = [] } = result;
      console.log('id', id);
      const body = {
        id,
        author,
        authorSlug,
        content,
        tags,
      };
      await prismaService.quote.upsert({
        create: body,
        update: body,
        where: { id },
      });
    }
  }
};

main().catch((error) => console.error(error));
