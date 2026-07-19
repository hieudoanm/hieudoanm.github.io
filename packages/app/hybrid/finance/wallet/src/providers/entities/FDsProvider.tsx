'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useEntitySync } from '@/hooks/useEntitySync';
import { fixedDeposits as seedFDs } from '@/data/mock';
import { db } from '@/lib/db';
import type { FixedDeposit } from '@/types';

interface FDsContextValue {
  fixedDeposits: FixedDeposit[];
  updateFixedDeposit: (fd: FixedDeposit) => Promise<void>;
  loading: boolean;
}

const FDsContext = createContext<FDsContextValue | null>(null);

export const FDsProvider = ({ children }: { children: ReactNode }) => {
  console.log('[FDsProvider] render');
  const { data, setData, loading, persistOne } = useEntitySync<FixedDeposit>(
    db.STORES.fixedDeposits,
    seedFDs
  );

  const updateFixedDeposit = useCallback(
    async (updated: FixedDeposit) => {
      console.log('[FDsProvider] updateFixedDeposit', updated.id);
      setData(data.map((fd) => (fd.id === updated.id ? updated : fd)));
      await persistOne(updated);
    },
    [data, setData, persistOne]
  );

  return (
    <FDsContext.Provider
      value={{ fixedDeposits: data, updateFixedDeposit, loading }}>
      {children}
    </FDsContext.Provider>
  );
};

export const useFDsContext = (): FDsContextValue => {
  const ctx = useContext(FDsContext);
  if (!ctx) throw new Error('useFDsContext must be used within FDsProvider');
  return ctx;
};
