'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { TransactionItem } from '@/components/atoms';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { TransactionFilters } from '@/components/molecules';
import { useData } from '@/providers/DataProvider';

const TransactionsPage = () => {
  const { transactions, loading } = useData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  console.log('[TransactionsPage] render', {
    loading,
    count: transactions.length,
  });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-2/5" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="rounded-btn h-10 flex-1" />
            <Skeleton className="rounded-btn h-10 w-20" />
            <Skeleton className="rounded-btn h-10 w-20" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const filtered = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || tx.type === filter;

    const txDate = new Date(tx.date);
    const matchesFrom = !dateFrom || txDate >= new Date(dateFrom);
    const matchesTo = !dateTo || txDate <= new Date(dateTo + 'T23:59:59');

    return matchesSearch && matchesFilter && matchesFrom && matchesTo;
  });

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-base-content/60">View your transaction history</p>
        </div>

        <TransactionFilters
          search={search}
          filter={filter}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
        />

        <div className="flex flex-col gap-2">
          {filtered.map((tx) => (
            <TransactionItem key={tx.id} transaction={tx} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-base-content/60">No transactions found</p>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default TransactionsPage;
