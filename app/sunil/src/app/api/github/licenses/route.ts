import { getLicenses } from '@sunil/common/clients/github/github.client';
import { License } from '@sunil/common/clients/github/github.dto';
import { NextResponse } from 'next/server';

type licensesResponse = { total: number; licenses: License[] };

export const GET = async () => {
  const licenses = await getLicenses();
  const total = licenses.length;
  return NextResponse.json<licensesResponse>(
    { total, licenses },
    {
      status: 200,
    }
  );
};
