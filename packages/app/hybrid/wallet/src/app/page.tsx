'use client';

import { DashboardTemplate } from '@/components/templates';
import { BalanceCard, AccountCard, TransactionItem } from '@/components/atoms';
import { QuickActions } from '@/components/molecules';
import { accounts, transactions } from '@/data/mock';

export default function HomePage() {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const recentTransactions = transactions.slice(0, 5);

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Good morning, Alex</h1>
          <p className="text-base-content/60">
            Here&apos;s your financial overview
          </p>
        </div>

        <BalanceCard amount={totalBalance} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        <QuickActions />

        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <a
              href="/transactions"
              className="text-primary text-sm hover:underline">
              View all
            </a>
          </div>

          <div className="flex flex-col gap-2">
            {recentTransactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} showDate />
            ))}
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
}
