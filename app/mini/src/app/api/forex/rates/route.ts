import { getLatest } from '@mini/common/clients/forex/frankfurter/frankfurter.client';
import { FrankfurterLatestResponse } from '@mini/common/clients/forex/frankfurter/frankfurter.dto';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const latestResponse: FrankfurterLatestResponse = await getLatest();
  return NextResponse.json<FrankfurterLatestResponse>(latestResponse, {
    status: 200,
  });
};
