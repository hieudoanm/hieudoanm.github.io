'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { CurrencyConverter, RateList } from '@/components/molecules';
import { useData } from '@/providers/DataProvider';

export default function ExchangePage() {
  const { currencyRates, loading } = useData();
  const [amount, setAmount] = useState('1000');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
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
    setFrom(to);
    setTo(from);
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Currency Exchange</h1>
          <p className="text-base-content/60">Convert between currencies</p>
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
          onConvert={() => {}}
        />

        <RateList rates={currencyRates} />
      </div>
    </DashboardTemplate>
  );
}
