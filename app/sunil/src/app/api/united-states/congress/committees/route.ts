import {
  getCommittees,
  Chamber,
} from '@sunil/common/clients/propublica/congress/congress.client';
import { NextRequest, NextResponse } from 'next/server';

const resolveQuery = (searchParameters: URLSearchParams) => {
  const chamber: Chamber = (searchParameters.get('chamber') ??
    'house') as Chamber;
  const congressString: string = searchParameters.get('congress') ?? '118';
  const congress: number = Number.parseInt(congressString, 10);

  return { congress, chamber };
};

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  const { searchParams } = new URL(request.url);
  const { congress, chamber } = resolveQuery(searchParams);
  const committeess = await getCommittees({ congress, chamber });
  const total = committeess.length;
  return NextResponse.json({ total, committeess }, { status: 200 });
};
