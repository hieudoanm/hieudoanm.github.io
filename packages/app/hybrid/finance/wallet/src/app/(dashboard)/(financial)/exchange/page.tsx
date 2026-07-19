'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import { CurrencyConverter } from '@/components/molecules';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { FiRepeat } from 'react-icons/fi';

const ExchangePage = () => {
  const { currencyRates, loading } = useData();
  const { showToast } = useToast();
  const [amount, setAmount] = useState('1000');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  console.log('[ExchangePage] render', { loading });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-2/5" />
            <SkeletonText className="w-1/3" />
          </div>
          <SkeletonCard className="h-64" />
        </div>
      </DashboardTemplate>
    );
  }

  const fromRate = currencyRates.find((r) => r.code === from);
  const toRate = currencyRates.find((r) => r.code === to);

  const converted =
    fromRate && toRate ? (Number(amount) / fromRate.rate) * toRate.rate : 0;
  const rate = fromRate && toRate ? toRate.rate / fromRate.rate : 0;

  const handleSwap = () => {
    console.log('[ExchangePage] swap', { from, to });
    setFrom(to);
    setTo(from);
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Exchange</h1>
            <p className="text-base-content/60">Convert between currencies</p>
          </div>
          <Link href="/rates" className="btn btn-neutral btn-sm gap-2">
            <FiRepeat /> Rates
          </Link>
        </div>

        <CurrencyConverter
          amount={amount}
          from={from}
          to={to}
          rates={currencyRates}
          converted={converted}
          rate={rate}
          onAmountChange={setAmount}
          onFromChange={setFrom}
          onToChange={setTo}
          onSwap={handleSwap}
          onConvert={() => {
            console.log('[ExchangePage] convert', {
              amount,
              from,
              to,
              converted,
            });
            showToast(
              `Converted ${Number(amount).toLocaleString()} ${from} to ${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`,
              'success'
            );
          }}
        />
      </div>
    </DashboardTemplate>
  );
};

export default ExchangePage;
