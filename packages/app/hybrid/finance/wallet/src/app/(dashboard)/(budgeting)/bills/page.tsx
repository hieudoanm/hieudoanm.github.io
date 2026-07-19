'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { BillItem } from '@/components/atoms';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import AddBillModal from '@/components/molecules/AddBillModal';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatCurrency } from '@/utils/format';
import { FiPlus } from 'react-icons/fi';

const BillsPage = () => {
  const { recurringBills, updateRecurringBill, loading } = useData();
  const { showToast } = useToast();
  const [showAdd, setShowAdd] = useState(false);

  console.log('[BillsPage] render', { loading, count: recurringBills.length });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-2/5" />
            <SkeletonText className="w-1/2" />
          </div>
          <Skeleton className="h-20 w-full rounded-xl" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
          <Skeleton className="rounded-btn mx-auto h-10 w-32" />
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
                console.log('[BillsPage] markPaid', bill.id);
                await updateRecurringBill({ ...bill, paid: true });
                showToast(`${bill.name} marked as paid`, 'success');
              }}
            />
          ))}
        </div>

        <button
          className="btn btn-primary mx-auto gap-2"
          onClick={() => setShowAdd(true)}>
          <FiPlus /> Add Bill
        </button>
      </div>
      <AddBillModal open={showAdd} onClose={() => setShowAdd(false)} />
    </DashboardTemplate>
  );
};

export default BillsPage;
