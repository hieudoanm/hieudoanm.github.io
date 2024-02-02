import { NextResponse } from 'next/server';
import { getTags } from './service';

type TagsResponse = {
  total: number;
  tags: string[];
};

export const GET = async () => {
  const { total = 0, tags = [] } = await getTags();
  return NextResponse.json<TagsResponse>({ total, tags }, { status: 200 });
};
