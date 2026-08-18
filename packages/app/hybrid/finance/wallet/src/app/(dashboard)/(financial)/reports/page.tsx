'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { SpendingChart } from '@/components/atoms';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { formatCurrency } from '@/utils/format';
import { exportTransactionsCSV, exportTransactionsPDF } from '@/utils/export';
import {
  FiDownload,
  FiFileText,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
} from 'react-icons/fi';

type ReportTab = 'overview' | 'spending' | 'income' | 'trends';

const ReportsPage = () => {
  const { transactions, budgetCategories, loading } = useData();
  const [tab, setTab] = useState<ReportTab>('overview');

  console.log('[ReportsPage] render', { loading, count: transactions.length });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="rounded-btn h-10 w-24" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SkeletonCard className="h-24" />
            <SkeletonCard className="h-24" />
            <SkeletonCard className="h-24" />
          </div>
          <SkeletonCard className="h-80" />
          <SkeletonCard className="h-80" />
        </div>
      </DashboardTemplate>
    );
  }

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
  const net = totalIncome - totalExpense;

  const tabs: { key: ReportTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'spending', label: 'Spending' },
    { key: 'income', label: 'Income' },
    { key: 'trends', label: 'Trends' },
  ];

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reports</h1>
            <p className="text-base-content/60">
              Financial insights and analytics
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-neutral gap-1"
              onClick={() => exportTransactionsCSV(transactions)}>
              <FiDownload className="text-sm" />
              CSV
            </button>
            <button
              className="btn btn-sm btn-neutral gap-1"
              onClick={() => exportTransactionsPDF(transactions)}>
              <FiFileText className="text-sm" />
              PDF
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`btn btn-sm ${tab === t.key ? 'btn-primary' : 'btn'}`}
              onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="card bg-base-200 shadow-md">
                <div className="card-body gap-2">
                  <div className="flex items-center gap-2">
                    <FiTrendingUp className="text-success text-xl" />
                    <span className="text-base-content/60 text-sm">Income</span>
                  </div>
                  <span className="text-success text-2xl font-bold">
                    {formatCurrency(totalIncome)}
                  </span>
                </div>
              </div>
              <div className="card bg-base-200 shadow-md">
                <div className="card-body gap-2">
                  <div className="flex items-center gap-2">
                    <FiTrendingDown className="text-error text-xl" />
                    <span className="text-base-content/60 text-sm">
                      Expenses
                    </span>
                  </div>
                  <span className="text-error text-2xl font-bold">
                    {formatCurrency(totalExpense)}
                  </span>
                </div>
              </div>
              <div className="card bg-base-200 shadow-md">
                <div className="card-body gap-2">
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="text-primary text-xl" />
                    <span className="text-base-content/60 text-sm">Net</span>
                  </div>
                  <span
                    className={`text-2xl font-bold ${net >= 0 ? 'text-success' : 'text-error'}`}>
                    {formatCurrency(net)}
                  </span>
                </div>
              </div>
            </div>

            <SpendingChart
              transactions={transactions}
              budgetCategories={budgetCategories}
              type="category"
            />

            <SpendingChart
              transactions={transactions}
              budgetCategories={budgetCategories}
              type="comparison"
            />
          </>
        )}

        {tab === 'spending' && (
          <>
            <SpendingChart
              transactions={transactions}
              budgetCategories={budgetCategories}
              type="category"
            />

            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-lg">Category Breakdown</h3>
                <div className="flex flex-col gap-3">
                  {budgetCategories
                    .sort((a, b) => b.spent - a.spent)
                    .map((cat) => {
                      const pct = Math.round((cat.spent / totalExpense) * 100);
                      return (
                        <div key={cat.id} className="flex items-center gap-3">
                          <span className="w-32 text-sm">{cat.name}</span>
                          <div className="flex-1">
                            <progress
                              className="progress progress-primary w-full"
                              value={cat.spent}
                              max={totalExpense}
                            />
                          </div>
                          <span className="w-20 text-right text-sm">
                            {formatCurrency(cat.spent)}
                          </span>
                          <span className="text-base-content/60 w-12 text-right text-xs">
                            {pct}%
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'income' && (
          <>
            <SpendingChart
              transactions={transactions}
              budgetCategories={budgetCategories}
              type="comparison"
            />

            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-lg">Income Sources</h3>
                <div className="flex flex-col gap-2">
                  {transactions
                    .filter((tx) => tx.type === 'income')
                    .sort((a, b) => b.amount - a.amount)
                    .map((tx) => (
                      <div
                        key={tx.id}
                        className="bg-base-300 flex items-center justify-between rounded-lg p-3">
                        <div>
                          <span className="font-medium">{tx.title}</span>
                          <span className="text-base-content/60 ml-2 text-sm">
                            {tx.category}
                          </span>
                        </div>
                        <span className="text-success font-medium">
                          +{formatCurrency(tx.amount)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'trends' && (
          <>
            <SpendingChart
              transactions={transactions}
              budgetCategories={budgetCategories}
              type="timeline"
            />

            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <h3 className="card-title text-lg">Daily Summary</h3>
                <div className="overflow-x-auto">
                  <table className="table-sm table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th className="text-right">Income</th>
                        <th className="text-right">Expense</th>
                        <th className="text-right">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(
                        transactions.reduce(
                          (acc, tx) => {
                            const day = tx.date.split('T')[0];
                            if (!acc[day]) acc[day] = { income: 0, expense: 0 };
                            if (tx.type === 'income')
                              acc[day].income += tx.amount;
                            else if (tx.type === 'expense')
                              acc[day].expense += Math.abs(tx.amount);
                            return acc;
                          },
                          {} as Record<
                            string,
                            { income: number; expense: number }
                          >
                        )
                      )
                        .sort(([a], [b]) => b.localeCompare(a))
                        .map(([date, data]) => (
                          <tr key={date}>
                            <td>
                              {new Date(date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </td>
                            <td className="text-success text-right">
                              {data.income > 0
                                ? `+${formatCurrency(data.income)}`
                                : '—'}
                            </td>
                            <td className="text-error text-right">
                              {data.expense > 0
                                ? `-${formatCurrency(data.expense)}`
                                : '—'}
                            </td>
                            <td
                              className={`text-right font-medium ${
                                data.income - data.expense >= 0
                                  ? 'text-success'
                                  : 'text-error'
                              }`}>
                              {formatCurrency(data.income - data.expense)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default ReportsPage;
