'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import { AccountDetail } from '@/components/atoms';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import AddAccountModal from '@/components/molecules/AddAccountModal';
import { useData } from '@/providers/DataProvider';
import { formatCurrency } from '@/utils/format';
import { FiPlus, FiArrowLeft } from 'react-icons/fi';

const CheckingAccountsPage = () => {
  const { accounts, loading } = useData();
  const [showAdd, setShowAdd] = useState(false);

  console.log('[CheckingAccountsPage] render', { loading });

  const checkingAccounts = accounts.filter((a) => a.type === 'checking');
  const totalBalance = checkingAccounts.reduce(
    (sum, acc) => sum + acc.balance,
    0
  );

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/3" />
            <SkeletonText className="w-1/2" />
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <SkeletonCard key={i} className="h-40" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Link href="/accounts" className="btn btn-neutral btn-sm btn-circle">
            <FiArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Checking Accounts</h1>
            <p className="text-base-content/60">
              {checkingAccounts.length} account
              {checkingAccounts.length !== 1 ? 's' : ''} ·{' '}
              {formatCurrency(totalBalance)}
            </p>
          </div>
        </div>

        {checkingAccounts.length === 0 ? (
          <div className="text-base-content/60 py-12 text-center">
            No checking accounts found. Add one to get started.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {checkingAccounts.map((account) => (
              <AccountDetail key={account.id} account={account} />
            ))}
          </div>
        )}

        <button
          className="btn btn-primary mx-auto gap-2"
          onClick={() => setShowAdd(true)}>
          <FiPlus /> Add Checking Account
        </button>
      </div>
      <AddAccountModal open={showAdd} onClose={() => setShowAdd(false)} />
    </DashboardTemplate>
  );
};

export default CheckingAccountsPage;
