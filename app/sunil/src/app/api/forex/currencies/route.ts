import { getCurrencies } from '@sunil/common/clients/forex/frankfurter/frankfurter.client';
import { CurrenciesResponse } from '@sunil/common/clients/forex/frankfurter/frankfurter.dto';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const currenciesResponse: CurrenciesResponse = await getCurrencies();
  return NextResponse.json<CurrenciesResponse>(currenciesResponse, {
    status: 200,
  });
};
