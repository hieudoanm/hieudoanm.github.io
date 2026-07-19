'use client';

import { createContext, useContext, useCallback, type ReactNode } from 'react';
import { useEntitySync } from '@/hooks/useEntitySync';
import { paymentRequests as seedPaymentRequests } from '@/data/mock';
import { db } from '@/lib/db';
import type { PaymentRequest } from '@/types';

interface PaymentRequestsContextValue {
  paymentRequests: PaymentRequest[];
  addPaymentRequest: (request: PaymentRequest) => Promise<void>;
  updatePaymentRequest: (request: PaymentRequest) => Promise<void>;
  loading: boolean;
}

const PaymentRequestsContext =
  createContext<PaymentRequestsContextValue | null>(null);

export const PaymentRequestsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  console.log('[PaymentRequestsProvider] render');
  const { data, setData, loading, persist, persistOne } =
    useEntitySync<PaymentRequest>(
      db.STORES.paymentRequests,
      seedPaymentRequests
    );

  const addPaymentRequest = useCallback(
    async (request: PaymentRequest) => {
      console.log('[PaymentRequestsProvider] addPaymentRequest', request.id);
      const next = [...data, request];
      setData(next);
      await persist(next);
    },
    [data, setData, persist]
  );

  const updatePaymentRequest = useCallback(
    async (updated: PaymentRequest) => {
      console.log('[PaymentRequestsProvider] updatePaymentRequest', updated.id);
      setData(data.map((r) => (r.id === updated.id ? updated : r)));
      await persistOne(updated);
    },
    [data, setData, persistOne]
  );

  return (
    <PaymentRequestsContext.Provider
      value={{
        paymentRequests: data,
        addPaymentRequest,
        updatePaymentRequest,
        loading,
      }}>
      {children}
    </PaymentRequestsContext.Provider>
  );
};

export const usePaymentRequestsContext = (): PaymentRequestsContextValue => {
  const ctx = useContext(PaymentRequestsContext);
  if (!ctx)
    throw new Error(
      'usePaymentRequestsContext must be used within PaymentRequestsProvider'
    );
  return ctx;
};
