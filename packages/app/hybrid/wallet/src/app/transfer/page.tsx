'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { TransferForm, TransferConfirmation } from '@/components/molecules';
import { useData } from '@/providers/DataProvider';

export default function TransferPage() {
  const { accounts, addTransaction, loading } = useData();
  const [fromAccount, setFromAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </DashboardTemplate>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleConfirm = async () => {
    const now = new Date().toISOString();
    const txId = String(Date.now());

    await addTransaction({
      id: txId,
      accountId: fromAccount || accounts[0]?.id || '1',
      title: `Transfer to ${recipient}`,
      category: 'Transfer',
      amount: -Math.abs(Number(amount)),
      currency: 'USD',
      date: now,
      type: 'transfer',
    });

    alert('Transfer successful!');
    setConfirmed(false);
    setRecipient('');
    setAmount('');
    setNote('');
  };

  if (confirmed) {
    return (
      <DashboardTemplate>
        <div className="mx-auto max-w-md">
          <TransferConfirmation
            recipient={recipient}
            amount={amount}
            note={note}
            onCancel={() => setConfirmed(false)}
            onConfirm={handleConfirm}
          />
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="mx-auto max-w-md">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold">Transfer</h1>
            <p className="text-base-content/60">Send money to anyone</p>
          </div>

          <TransferForm
            accounts={accounts}
            fromAccount={fromAccount || accounts[0]?.id}
            recipient={recipient}
            amount={amount}
            note={note}
            onFromAccountChange={setFromAccount}
            onRecipientChange={setRecipient}
            onAmountChange={setAmount}
            onNoteChange={setNote}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </DashboardTemplate>
  );
}
