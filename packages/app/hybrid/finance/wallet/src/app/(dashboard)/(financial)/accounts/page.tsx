'use client';

import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { formatCurrency } from '@/utils/format';
import {
  FiCreditCard,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
} from 'react-icons/fi';

const sections = [
  {
    label: 'Checking',
    href: '/accounts/checking',
    icon: FiDollarSign,
    type: 'checking' as const,
  },
  {
    label: 'Savings',
    href: '/accounts/savings',
    icon: FiTrendingUp,
    type: 'savings' as const,
  },
  {
    label: 'Credit',
    href: '/accounts/credit',
    icon: FiCreditCard,
    type: 'credit' as const,
  },
];

const AccountsOverviewPage = () => {
  const { accounts, loading } = useData();

  console.log('[AccountsOverviewPage] render', {
    loading,
    count: accounts.length,
  });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/3" />
            <SkeletonText className="w-1/2" />
          </div>
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} className="h-32" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalAccounts = accounts.length;

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-base-content/60">Overview of all your accounts</p>
        </div>

        <div className="card bg-primary text-primary-content shadow-md">
          <div className="card-body">
            <p className="text-sm opacity-80">Total Balance</p>
            <p className="text-3xl font-bold">{formatCurrency(totalBalance)}</p>
            <p className="text-sm opacity-80">{totalAccounts} accounts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {sections.map((section) => {
            const sectionAccounts = accounts.filter(
              (a) => a.type === section.type
            );
            const sectionBalance = sectionAccounts.reduce(
              (sum, acc) => sum + acc.balance,
              0
            );

            return (
              <Link
                key={section.type}
                href={section.href}
                className="card bg-base-200 shadow-md transition-shadow hover:shadow-lg">
                <div className="card-body gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <section.icon className="text-primary text-lg" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{section.label}</h3>
                      <p className="text-base-content/60 text-sm">
                        {sectionAccounts.length} account
                        {sectionAccounts.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="divider my-0" />
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 text-sm">
                      Balance
                    </span>
                    <span className="font-bold">
                      {formatCurrency(sectionBalance)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {totalAccounts === 0 && (
          <div className="text-base-content/60 py-12 text-center">
            No accounts found. Add your first account to get started.
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default AccountsOverviewPage;
