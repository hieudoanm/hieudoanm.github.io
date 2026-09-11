'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { OrderBookGame } from '@/games/economics/order-book';

const OrderBookPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/economics/market-microstructure"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      Order Book
    </h1>
    <OrderBookGame />
  </div>
);

export default OrderBookPage;
