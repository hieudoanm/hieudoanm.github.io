'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useEntitySync } from '@/hooks/useEntitySync';
import { currencyRates as seedCurrencyRates } from '@/data/mock';
import { db } from '@/lib/db';
import type { CurrencyRate } from '@/types';

interface CurrencyRatesContextValue {
  currencyRates: CurrencyRate[];
  loading: boolean;
}

const CurrencyRatesContext = createContext<CurrencyRatesContextValue | null>(
  null
);

export const CurrencyRatesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  console.log('[CurrencyRatesProvider] render');
  const { data, loading } = useEntitySync<CurrencyRate>(
    db.STORES.currencyRates,
    seedCurrencyRates
  );

  return (
    <CurrencyRatesContext.Provider value={{ currencyRates: data, loading }}>
      {children}
    </CurrencyRatesContext.Provider>
  );
};

export const useCurrencyRatesContext = (): CurrencyRatesContextValue => {
  const ctx = useContext(CurrencyRatesContext);
  if (!ctx)
    throw new Error(
      'useCurrencyRatesContext must be used within CurrencyRatesProvider'
    );
  return ctx;
};
