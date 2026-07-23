'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { AccountDetail } from '@/components/atoms';
import AddAccountModal from '@/components/molecules/AddAccountModal';
import { useData } from '@/providers/DataProvider';
import { FiPlus } from 'react-icons/fi';

type AccountType = 'all' | 'checking' | 'savings' | 'credit';

const filters: { label: string; value: AccountType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Checking', value: 'checking' },
  { label: 'Savings', value: 'savings' },
  { label: 'Credit', value: 'credit' },
];

export default function AccountsPage() {
  const { accounts, loading } = useData();
  const [filter, setFilter] = useState<AccountType>('all');
  const [showAdd, setShowAdd] = useState(false);

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </DashboardTemplate>
    );
  }

  const filtered =
    filter === 'all' ? accounts : accounts.filter((a) => a.type === filter);

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-base-content/60">Manage your accounts</p>
        </div>

        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`btn btn-sm ${filter === f.value ? 'btn-primary' : 'btn'}`}
              onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-base-content/60 py-12 text-center">
            No accounts found for this filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((account) => (
              <AccountDetail key={account.id} account={account} />
            ))}
          </div>
        )}

        <button
          className="btn btn-primary mx-auto gap-2"
          onClick={() => setShowAdd(true)}>
          <FiPlus /> Add Account
        </button>
      </div>
      <AddAccountModal open={showAdd} onClose={() => setShowAdd(false)} />
    </DashboardTemplate>
  );
}
