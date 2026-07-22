'use client';

import { DashboardTemplate } from '@/components/templates';
import { AccountDetail } from '@/components/atoms';
import { accounts } from '@/data/mock';
import { FiPlus } from 'react-icons/fi';

export default function AccountsPage() {
  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-base-content/60">Manage your accounts</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {accounts.map((account) => (
            <AccountDetail key={account.id} account={account} />
          ))}
        </div>

        <button className="btn btn-outline btn-primary mx-auto gap-2">
          <FiPlus /> Add Account
        </button>
      </div>
    </DashboardTemplate>
  );
}
