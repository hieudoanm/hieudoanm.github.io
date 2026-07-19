'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatCurrency, formatDate } from '@/utils/format';
import { FiPlus, FiTrash2, FiPause, FiPlay, FiRepeat } from 'react-icons/fi';
import type { RecurringTransfer } from '@/types';

const RecurringTransfersPage = () => {
  const {
    accounts,
    contacts,
    recurringTransfers,
    addRecurringTransfer,
    updateRecurringTransfer,
    loading,
  } = useData();
  const { showToast } = useToast();

  const [showForm, setShowForm] = useState(false);
  const [fromAccountId, setFromAccountId] = useState('');
  const [toContactId, setToContactId] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'monthly' | 'yearly'>(
    'monthly'
  );

  console.log('[RecurringTransfersPage] render', {
    loading,
    count: recurringTransfers.length,
  });

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const getContactName = (id: string): string =>
    contacts.find((c) => c.id === id)?.name ?? 'Unknown';

  const getAccountName = (id: string): string =>
    accounts.find((a) => a.id === id)?.name ?? 'Unknown';

  const handleAdd = async () => {
    if (!fromAccountId || !toContactId || !amount || Number(amount) <= 0)
      return;

    const transfer: RecurringTransfer = {
      id: String(Date.now()),
      fromAccountId,
      toContactId,
      amount: Number(amount),
      currency: 'USD',
      frequency,
      nextDue: getNextDueDate(frequency),
      active: true,
    };

    await addRecurringTransfer(transfer);
    showToast('Recurring transfer created!', 'success');
    setAmount('');
    setShowForm(false);
  };

  const handleToggle = async (transfer: RecurringTransfer) => {
    await updateRecurringTransfer({ ...transfer, active: !transfer.active });
    showToast(
      transfer.active ? 'Transfer paused' : 'Transfer resumed',
      'success'
    );
  };

  const getNextDueDate = (freq: string): string => {
    const now = new Date();
    switch (freq) {
      case 'weekly':
        now.setDate(now.getDate() + 7);
        break;
      case 'monthly':
        now.setMonth(now.getMonth() + 1);
        break;
      case 'yearly':
        now.setFullYear(now.getFullYear() + 1);
        break;
    }
    return now.toISOString().split('T')[0];
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Recurring Transfers</h1>
            <p className="text-base-content/60">
              Manage automatic recurring payments
            </p>
          </div>
          <button
            className="btn btn-primary btn-sm gap-1"
            onClick={() => setShowForm(!showForm)}>
            <FiPlus /> New
          </button>
        </div>

        {showForm && (
          <div className="card bg-base-200 shadow-md">
            <div className="card-body gap-3">
              <h3 className="card-title text-lg">New Recurring Transfer</h3>

              <label className="floating-label">
                <span>From Account</span>
                <select
                  className="select select-bordered w-full"
                  value={fromAccountId}
                  onChange={(e) => setFromAccountId(e.target.value)}>
                  <option value="">Select account</option>
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({formatCurrency(acc.balance)})
                    </option>
                  ))}
                </select>
              </label>

              <label className="floating-label">
                <span>To Contact</span>
                <select
                  className="select select-bordered w-full"
                  value={toContactId}
                  onChange={(e) => setToContactId(e.target.value)}>
                  <option value="">Select contact</option>
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="floating-label">
                <span>Amount</span>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                />
              </label>

              <label className="floating-label">
                <span>Frequency</span>
                <select
                  className="select select-bordered w-full"
                  value={frequency}
                  onChange={(e) =>
                    setFrequency(
                      e.target.value as 'weekly' | 'monthly' | 'yearly'
                    )
                  }>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>

              <div className="flex gap-3">
                <button
                  className="btn btn-neutral flex-1"
                  onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary flex-1"
                  disabled={
                    !fromAccountId ||
                    !toContactId ||
                    !amount ||
                    Number(amount) <= 0
                  }
                  onClick={handleAdd}>
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {recurringTransfers.map((transfer) => (
            <div
              key={transfer.id}
              className={`card shadow-sm ${transfer.active ? 'bg-base-200' : 'bg-base-300 opacity-60'}`}>
              <div className="card-body flex-row items-center gap-3 p-3">
                <div
                  className={`rounded-full p-2 ${transfer.active ? 'bg-primary/10' : 'bg-base-content/10'}`}>
                  <FiRepeat
                    className={`text-lg ${transfer.active ? 'text-primary' : 'text-base-content/40'}`}
                  />
                </div>

                <div className="flex-1">
                  <span className="font-medium">
                    {getAccountName(transfer.fromAccountId)} →{' '}
                    {getContactName(transfer.toContactId)}
                  </span>
                  <div className="text-base-content/60 text-sm">
                    {formatCurrency(transfer.amount)} · {transfer.frequency} ·{' '}
                    Next: {formatDate(transfer.nextDue)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className={`btn btn-sm btn-circle ${transfer.active ? 'btn-warning' : 'btn-success'}`}
                    onClick={() => handleToggle(transfer)}>
                    {transfer.active ? (
                      <FiPause className="text-sm" />
                    ) : (
                      <FiPlay className="text-sm" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recurringTransfers.length === 0 && (
          <div className="py-12 text-center">
            <FiRepeat className="text-base-content/30 mx-auto mb-3 text-4xl" />
            <p className="text-base-content/60">No recurring transfers</p>
            <p className="text-base-content/40 text-sm">
              Set up automatic payments to your contacts
            </p>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default RecurringTransfersPage;
