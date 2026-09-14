'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { TradeGame } from '@/games/economics/trade';

const TradeTariffLabPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/trade-and-tariffs"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Trade & Tariff Lab
    </h1>
    <TradeGame />
  </div>
);

export default TradeTariffLabPage;
