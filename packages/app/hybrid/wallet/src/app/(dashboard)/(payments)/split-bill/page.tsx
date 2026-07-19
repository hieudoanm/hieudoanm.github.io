'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { SplitBill } from '@/components/molecules';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatCurrency } from '@/utils/format';
import { FiCheckCircle, FiDollarSign } from 'react-icons/fi';

const SplitBillPage = () => {
  const { contacts, addTransaction, loading } = useData();
  const { showToast } = useToast();

  const [totalAmount, setTotalAmount] = useState('');
  const [success, setSuccess] = useState(false);

  console.log('[SplitBillPage] render', { loading, contacts: contacts.length });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="mx-auto flex max-w-md flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <SkeletonCard className="h-24" />
          <SkeletonCard className="h-48" />
        </div>
      </DashboardTemplate>
    );
  }

  const handleSplit = async (
    splits: { contactId: string; amount: number }[]
  ) => {
    console.log('[SplitBillPage] split', { splits });

    for (const split of splits) {
      await addTransaction({
        id: String(Date.now() + Math.random()),
        accountId: '1',
        title: `Split bill with contact`,
        category: 'Food & Drink',
        amount: -split.amount,
        currency: 'USD',
        date: new Date().toISOString(),
        type: 'expense',
      });
    }

    showToast(`Bill split with ${splits.length} people!`, 'success');
    setSuccess(true);
  };

  if (success) {
    return (
      <DashboardTemplate>
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-12 text-center">
          <FiCheckCircle className="text-success text-6xl" />
          <h1 className="text-2xl font-bold">Bill Split!</h1>
          <p className="text-base-content/60">Your share has been recorded</p>
          <button
            className="btn btn-primary w-full"
            onClick={() => {
              setSuccess(false);
              setTotalAmount('');
            }}>
            Split Another Bill
          </button>
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="mx-auto max-w-md">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">Split Bill</h1>
            <p className="text-base-content/60">
              Split a bill with your contacts
            </p>
          </div>

          <div className="card bg-base-200 shadow-md">
            <div className="card-body gap-3">
              <label className="floating-label">
                <span>Total Bill Amount</span>
                <div className="relative w-full">
                  <FiDollarSign className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
                  <input
                    type="number"
                    placeholder="0.00"
                    className="input input-bordered w-full pl-10"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    min="0.01"
                    step="0.01"
                  />
                </div>
              </label>
            </div>
          </div>

          {Number(totalAmount) > 0 && (
            <SplitBill
              totalAmount={Number(totalAmount)}
              contacts={contacts}
              onSplit={handleSplit}
            />
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default SplitBillPage;
