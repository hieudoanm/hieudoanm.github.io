import { getCoins } from '@sunil/common/clients/coin-ranking/coinranking.client';
import { CoinRankingResponse } from '@sunil/common/clients/coin-ranking/coinranking.dto';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const coinsResponse: CoinRankingResponse = await getCoins();
  return NextResponse.json<CoinRankingResponse>(coinsResponse, {
    status: 200,
  });
};
