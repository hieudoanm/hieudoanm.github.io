'use client';

import { DashboardTemplate } from '@/components/templates';
import { BillItem } from '@/components/atoms';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatCurrency } from '@/utils/format';
import { FiPlus } from 'react-icons/fi';

export default function BillsPage() {
  const { recurringBills, updateRecurringBill, loading } = useData();
  const { showToast } = useToast();

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </DashboardTemplate>
    );
  }

  const totalDue = recurringBills
    .filter((b) => !b.paid)
    .reduce((sum, b) => sum + b.amount, 0);

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Bills & Recurring</h1>
          <p className="text-base-content/60">Manage your recurring payments</p>
        </div>

        <div className="card bg-warning text-warning-content shadow-md">
          <div className="card-body">
            <p className="text-sm opacity-80">Total Due This Month</p>
            <p className="text-2xl font-bold">{formatCurrency(totalDue)}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {recurringBills.map((bill) => (
            <BillItem
              key={bill.id}
              bill={bill}
              onPay={async () => {
                await updateRecurringBill({ ...bill, paid: true });
                showToast(`${bill.name} marked as paid`, 'success');
              }}
            />
          ))}
        </div>

        <button className="btn btn-primary mx-auto gap-2">
          <FiPlus /> Add Bill
        </button>
      </div>
    </DashboardTemplate>
  );
}
