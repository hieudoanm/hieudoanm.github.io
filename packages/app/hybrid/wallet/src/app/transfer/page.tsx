'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { TransferForm, TransferConfirmation } from '@/components/molecules';
import { accounts } from '@/data/mock';

export default function TransferPage() {
  const [fromAccount, setFromAccount] = useState(accounts[0].id);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
  };

  const handleConfirm = () => {
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
            fromAccount={fromAccount}
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
