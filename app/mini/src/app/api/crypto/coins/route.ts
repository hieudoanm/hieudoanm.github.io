import { getCoins } from '@mini/common/clients/coinranking/coinranking.client';
import { CoinRankingResponse } from '@mini/common/clients/coinranking/coinranking.dto';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const coinsResponse: CoinRankingResponse = await getCoins();
  return NextResponse.json<CoinRankingResponse>(coinsResponse, {
    status: 200,
  });
};
