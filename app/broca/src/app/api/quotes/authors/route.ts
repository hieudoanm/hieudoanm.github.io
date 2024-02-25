import { NextResponse } from 'next/server';
import { getAuthors } from './service';

type AuthorsResponse = {
  total: number;
  authors: string[];
};

export const GET = async () => {
  const { total = 0, authors = [] } = await getAuthors();
  return NextResponse.json<AuthorsResponse>(
    { total, authors },
    { status: 200 }
  );
};
