'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useEntitySync } from '@/hooks/useEntitySync';
import { transactions as seedTransactions } from '@/data/mock';
import { db } from '@/lib/db';
import type { Transaction } from '@/types';

interface TransactionsContextValue {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => Promise<void>;
  loading: boolean;
}

const TransactionsContext = createContext<TransactionsContextValue | null>(
  null
);

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  console.log('[TransactionsProvider] render');
  const { data, setData, loading, persist } = useEntitySync<Transaction>(
    db.STORES.transactions,
    seedTransactions
  );

  const addTransaction = useCallback(
    async (tx: Transaction) => {
      console.log('[TransactionsProvider] addTransaction', tx.id);
      const next = [tx, ...data];
      setData(next);
      await persist(next);
    },
    [data, setData, persist]
  );

  return (
    <TransactionsContext.Provider
      value={{ transactions: data, addTransaction, loading }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactionsContext = (): TransactionsContextValue => {
  const ctx = useContext(TransactionsContext);
  if (!ctx)
    throw new Error(
      'useTransactionsContext must be used within TransactionsProvider'
    );
  return ctx;
};
