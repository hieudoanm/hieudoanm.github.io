'use client';

import { useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { useHaptic } from '@/hooks/useHaptic';
import { formatCurrency } from '@/utils/format';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import {
  FiUser,
  FiDollarSign,
  FiCheckCircle,
  FiArrowLeft,
  FiArrowRight,
  FiSend,
} from 'react-icons/fi';

const STEPS = ['Recipient', 'Amount', 'Review'] as const;
type Step = (typeof STEPS)[number];

const stepIndex = (step: Step): number => STEPS.indexOf(step);

const TransferPage = () => {
  const { accounts, addTransaction, loading } = useData();
  const { showToast } = useToast();
  const { vibrate } = useHaptic();

  const [step, setStep] = useState<Step>('Recipient');
  const [fromAccount, setFromAccount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [success, setSuccess] = useState(false);

  console.log('[TransferPage] render', { loading, step });

  const selectedAccount =
    accounts.find((a) => a.id === (fromAccount || accounts[0]?.id)) ??
    accounts[0];

  const goNext = () => {
    const idx = stepIndex(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const goBack = () => {
    const idx = stepIndex(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  };

  const handleConfirm = async () => {
    const txId = String(Date.now());
    console.log('[TransferPage] confirm', { txId, recipient, amount });

    await addTransaction({
      id: txId,
      accountId: selectedAccount?.id ?? '1',
      title: `Transfer to ${recipient}`,
      category: 'Transfer',
      amount: -Math.abs(Number(amount)),
      currency: 'USD',
      date: new Date().toISOString(),
      type: 'transfer',
    });

    showToast('Transfer successful!', 'success');
    vibrate('success');
    setSuccess(true);
  };

  const handleReset = () => {
    setStep('Recipient');
    setFromAccount('');
    setRecipient('');
    setAmount('');
    setNote('');
    setSuccess(false);
  };

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="mx-auto flex max-w-md flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="rounded-btn h-8 flex-1" />
            ))}
          </div>
          <SkeletonCard className="h-48" />
          <Skeleton className="rounded-btn h-12 w-full" />
        </div>
      </DashboardTemplate>
    );
  }

  if (success) {
    return (
      <DashboardTemplate>
        <div className="mx-auto flex max-w-md flex-col items-center gap-6 py-12 text-center">
          <FiCheckCircle className="text-success text-6xl" />
          <h1 className="text-2xl font-bold">Transfer Sent!</h1>
          <p className="text-base-content/60">
            {formatCurrency(Math.abs(Number(amount)))} sent to{' '}
            <span className="text-base-content font-medium">{recipient}</span>
          </p>
          <button className="btn btn-primary w-full" onClick={handleReset}>
            New Transfer
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
            <h1 className="text-2xl font-bold">Transfer</h1>
            <p className="text-base-content/60">Send money to anyone</p>
          </div>

          {/* Stepper */}
          <ul className="steps w-full">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className={`step ${
                  stepIndex(step) >= i ? 'step-primary' : ''
                }`}>
                {s}
              </li>
            ))}
          </ul>

          {/* Step 1: Recipient */}
          {step === 'Recipient' && (
            <div className="flex flex-col gap-4">
              <label className="floating-label">
                <span>From Account</span>
                <select
                  className="select select-bordered w-full"
                  value={fromAccount || accounts[0]?.id}
                  onChange={(e) => setFromAccount(e.target.value)}>
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name} ({formatCurrency(acc.balance)})
                    </option>
                  ))}
                </select>
              </label>

              <label className="floating-label">
                <span>Recipient</span>
                <div className="relative w-full">
                  <FiUser className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Recipient name or account"
                    className="input input-bordered w-full pl-10"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    required
                  />
                </div>
              </label>

              <button
                className="btn btn-primary w-full gap-2"
                disabled={!recipient.trim()}
                onClick={goNext}>
                Next <FiArrowRight />
              </button>
            </div>
          )}

          {/* Step 2: Amount */}
          {step === 'Amount' && (
            <div className="flex flex-col gap-4">
              <label className="floating-label">
                <span>Amount</span>
                <div className="relative w-full">
                  <FiDollarSign className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
                  <input
                    type="number"
                    placeholder="0.00"
                    className="input input-bordered w-full pl-10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0.01"
                    step="0.01"
                    required
                  />
                </div>
              </label>

              <label className="floating-label">
                <span>Note (optional)</span>
                <input
                  type="text"
                  placeholder="What's this for?"
                  className="input input-bordered w-full"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </label>

              <div className="flex gap-3">
                <button
                  className="btn btn-neutral flex-1 gap-2"
                  onClick={goBack}>
                  <FiArrowLeft /> Back
                </button>
                <button
                  className="btn btn-primary flex-1 gap-2"
                  disabled={!amount || Number(amount) <= 0}
                  onClick={goNext}>
                  Next <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 'Review' && (
            <div className="flex flex-col gap-4">
              <div className="card bg-base-200 shadow-md">
                <div className="card-body gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 text-sm">From</span>
                    <span className="font-medium">{selectedAccount?.name}</span>
                  </div>
                  <div className="divider my-0" />
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 text-sm">To</span>
                    <span className="font-medium">{recipient}</span>
                  </div>
                  <div className="divider my-0" />
                  <div className="flex items-center justify-between">
                    <span className="text-base-content/60 text-sm">Amount</span>
                    <span className="text-primary text-xl font-bold">
                      {formatCurrency(Number(amount) || 0)}
                    </span>
                  </div>
                  {note && (
                    <>
                      <div className="divider my-0" />
                      <div className="flex items-center justify-between">
                        <span className="text-base-content/60 text-sm">
                          Note
                        </span>
                        <span>{note}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="btn btn-neutral flex-1 gap-2"
                  onClick={goBack}>
                  <FiArrowLeft /> Back
                </button>
                <button
                  className="btn btn-primary flex-1 gap-2"
                  onClick={handleConfirm}>
                  <FiSend /> Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default TransferPage;
