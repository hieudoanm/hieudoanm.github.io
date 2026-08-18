'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { DashboardTemplate } from '@/components/templates';
import SwipeableTransactionItem from '@/components/atoms/SwipeableTransactionItem';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { TransactionFilters } from '@/components/molecules';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { usePullToRefresh } from '@/hooks/usePullToRefresh';
import { exportTransactionsCSV, exportTransactionsPDF } from '@/utils/export';
import { FiDownload, FiFileText, FiLoader } from 'react-icons/fi';

const PAGE_SIZE = 10;

const TransactionsPage = () => {
  const { transactions, loading } = useData();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [category, setCategory] = useState('All');
  const [amountMin, setAmountMin] = useState('');
  const [amountMax, setAmountMax] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  console.log('[TransactionsPage] render', {
    loading,
    count: transactions.length,
    visibleCount,
  });

  const filtered = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || tx.type === filter;
    const matchesCategory = category === 'All' || tx.category === category;

    const txDate = new Date(tx.date);
    const matchesFrom = !dateFrom || txDate >= new Date(dateFrom);
    const matchesTo = !dateTo || txDate <= new Date(dateTo + 'T23:59:59');

    const absAmount = Math.abs(tx.amount);
    const matchesMin = !amountMin || absAmount >= Number(amountMin);
    const matchesMax = !amountMax || absAmount <= Number(amountMax);

    return (
      matchesSearch &&
      matchesFilter &&
      matchesCategory &&
      matchesFrom &&
      matchesTo &&
      matchesMin &&
      matchesMax
    );
  });

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setVisibleCount((prev) => prev + PAGE_SIZE);
    }
  }, [hasMore]);

  // Infinite scroll via IntersectionObserver
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  // Pull to refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await new Promise((r) => setTimeout(r, 800));
    setVisibleCount(PAGE_SIZE);
    setIsRefreshing(false);
    showToast('Transactions refreshed', 'info');
  }, [showToast]);

  const { pullDistance, handlers: pullHandlers } = usePullToRefresh({
    onRefresh: handleRefresh,
  });

  const handleDelete = (id: string) => {
    showToast('Transaction deleted', 'success');
  };

  const handleArchive = (id: string) => {
    showToast('Transaction archived', 'info');
  };

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

  return (
    <DashboardTemplate>
      <div
        className="flex flex-col gap-6"
        {...pullHandlers}
        style={{
          transform:
            pullDistance > 0 ? `translateY(${pullDistance}px)` : undefined,
          transition: pullDistance > 0 ? 'none' : 'transform 0.2s ease-out',
        }}>
        {/* Pull to refresh indicator */}
        {pullDistance > 0 && (
          <div className="flex justify-center py-2">
            <div
              className={`text-primary ${isRefreshing ? 'animate-spin' : ''}`}
              style={{ opacity: Math.min(pullDistance / 80, 1) }}>
              <FiLoader className="text-2xl" />
            </div>
          </div>
        )}

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-base-content/60">
              {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-neutral gap-1"
              onClick={() => exportTransactionsCSV(filtered)}>
              <FiDownload className="text-sm" />
              CSV
            </button>
            <button
              className="btn btn-sm btn-neutral gap-1"
              onClick={() => exportTransactionsPDF(filtered)}>
              <FiFileText className="text-sm" />
              PDF
            </button>
          </div>
        </div>

        <TransactionFilters
          search={search}
          filter={filter}
          dateFrom={dateFrom}
          dateTo={dateTo}
          category={category}
          amountMin={amountMin}
          amountMax={amountMax}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          onCategoryChange={setCategory}
          onAmountMinChange={setAmountMin}
          onAmountMaxChange={setAmountMax}
        />

        <div className="flex flex-col gap-2">
          {visibleItems.map((tx) => (
            <SwipeableTransactionItem
              key={tx.id}
              transaction={tx}
              onDelete={handleDelete}
              onArchive={handleArchive}
            />
          ))}
        </div>

        {/* Infinite scroll sentinel */}
        <div ref={observerRef} className="h-4" />

        {hasMore && (
          <div className="flex justify-center py-4">
            <span className="loading loading-spinner loading-sm" />
          </div>
        )}

        {!hasMore && filtered.length > 0 && (
          <p className="text-base-content/40 py-4 text-center text-sm">
            All transactions loaded
          </p>
        )}

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
