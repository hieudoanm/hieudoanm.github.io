'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { TransactionItem } from '@/components/atoms';
import { TransactionFilters } from '@/components/molecules';
import { useData } from '@/providers/DataProvider';

export default function TransactionsPage() {
  const { transactions, loading } = useData();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </DashboardTemplate>
    );
  }

  const filtered = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || tx.type === filter;
    return matchesSearch && matchesFilter;
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
          onSearchChange={setSearch}
          onFilterChange={setFilter}
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
}
