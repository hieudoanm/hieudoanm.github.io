'use client';

import { useState, useMemo, type FC } from 'react';
import { DashboardTemplate } from '@/components/templates';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { formatCurrency, formatDate } from '@/utils/format';
import {
  FiPlus,
  FiArrowLeft,
  FiTrendingUp,
  FiCalendar,
  FiDollarSign,
  FiPercent,
} from 'react-icons/fi';
import Link from 'next/link';
import type { FixedDeposit } from '@/types';

const TENURE_OPTIONS = [6, 12, 24, 36, 60];

const calcMaturityAmount = (
  principal: number,
  annualRate: number,
  months: number
): number => {
  const r = annualRate / 100 / 12;
  const n = months;
  if (r === 0) return principal;
  return principal * Math.pow(1 + r, n);
};

const FixedDepositsPage: FC = () => {
  const { fixedDeposits, recurringDeposits, loading, updateFixedDeposit } =
    useData();

  const [calcAmount, setCalcAmount] = useState<number>(10000);
  const [calcTenure, setCalcTenure] = useState<number>(12);
  const [calcRate, setCalcRate] = useState<number>(7.5);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  console.log('[FixedDepositsPage] render', {
    loading,
    count: fixedDeposits.length,
  });

  const activeFDs = useMemo(
    () => fixedDeposits.filter((fd) => fd.status === 'active'),
    [fixedDeposits]
  );

  const totalInvested = useMemo(
    () => fixedDeposits.reduce((sum, fd) => sum + fd.depositAmount, 0),
    [fixedDeposits]
  );

  const totalMaturity = useMemo(
    () => fixedDeposits.reduce((sum, fd) => sum + fd.maturityAmount, 0),
    [fixedDeposits]
  );

  const avgInterestRate = useMemo(() => {
    if (fixedDeposits.length === 0) return 0;
    const total = fixedDeposits.reduce((sum, fd) => sum + fd.interestRate, 0);
    return total / fixedDeposits.length;
  }, [fixedDeposits]);

  const calcMaturity = useMemo(
    () => calcMaturityAmount(calcAmount, calcRate, calcTenure),
    [calcAmount, calcRate, calcTenure]
  );

  const calcInterest = useMemo(
    () => calcMaturity - calcAmount,
    [calcMaturity, calcAmount]
  );

  const rdComparison = useMemo(() => {
    const rdMonthly = calcAmount / calcTenure;
    const rdRate = calcRate;
    let rdTotal = 0;
    for (let i = 0; i < calcTenure; i++) {
      const remaining = calcTenure - i;
      rdTotal += rdMonthly * Math.pow(1 + rdRate / 100 / 12, remaining);
    }
    return {
      monthlyDeposit: rdMonthly,
      maturityAmount: rdTotal,
      totalInterest: rdTotal - calcAmount,
    };
  }, [calcAmount, calcRate, calcTenure]);

  const handleAutoRenewToggle = (fd: FixedDeposit) => {
    console.log('[FixedDepositsPage] auto-renew toggle', {
      id: fd.id,
      value: !fd.autoRenew,
    });
    updateFixedDeposit({ ...fd, autoRenew: !fd.autoRenew });
  };

  const handleCalcAmountChange = (value: string) => {
    const num = parseFloat(value);
    if (!Number.isNaN(num) && num >= 0) setCalcAmount(num);
  };

  const handleCalcRateChange = (value: string) => {
    const num = parseFloat(value);
    if (!Number.isNaN(num) && num >= 0) setCalcRate(num);
  };

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="h-24" />
            ))}
          </div>
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="btn btn-neutral btn-sm btn-circle">
              <FiArrowLeft />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Fixed Deposits</h1>
              <p className="text-base-content/60">
                {activeFDs.length} active FD
                {activeFDs.length !== 1 ? 's' : ''} ·{' '}
                {formatCurrency(totalMaturity)} at maturity
              </p>
            </div>
          </div>
          <button className="btn btn-primary btn-sm gap-2">
            <FiPlus /> New FD
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="bg-base-200 rounded-box p-4">
            <div className="text-base-content/60 flex items-center gap-2 text-sm">
              <FiDollarSign className="h-4 w-4" />
              Total Invested
            </div>
            <div className="mt-1 text-xl font-bold">
              {formatCurrency(totalInvested)}
            </div>
          </div>
          <div className="bg-base-200 rounded-box p-4">
            <div className="text-base-content/60 flex items-center gap-2 text-sm">
              <FiTrendingUp className="h-4 w-4" />
              Total Maturity
            </div>
            <div className="mt-1 text-xl font-bold">
              {formatCurrency(totalMaturity)}
            </div>
          </div>
          <div className="bg-base-200 rounded-box p-4">
            <div className="text-base-content/60 flex items-center gap-2 text-sm">
              <FiCalendar className="h-4 w-4" />
              Active FDs
            </div>
            <div className="mt-1 text-xl font-bold">{activeFDs.length}</div>
          </div>
          <div className="bg-base-200 rounded-box p-4">
            <div className="text-base-content/60 flex items-center gap-2 text-sm">
              <FiPercent className="h-4 w-4" />
              Avg Interest Rate
            </div>
            <div className="mt-1 text-xl font-bold">
              {avgInterestRate.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Active FDs List */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Active Deposits</h2>
          {activeFDs.length === 0 ? (
            <div className="text-base-content/60 py-12 text-center">
              No active fixed deposits. Create one to get started.
            </div>
          ) : (
            activeFDs.map((fd) => (
              <div
                key={fd.id}
                className="bg-base-200 rounded-box flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{fd.name}</span>
                    <span className="badge badge-primary badge-sm">
                      {fd.interestRate}%
                    </span>
                  </div>
                  <div className="text-base-content/60 text-sm">
                    {formatCurrency(fd.depositAmount, fd.currency)} deposited ·
                    Matures {formatDate(fd.maturityDate)}
                  </div>
                  <div className="text-base-content/60 text-sm">
                    Maturity amount:{' '}
                    <span className="text-success font-medium">
                      {formatCurrency(fd.maturityAmount, fd.currency)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      className="toggle toggle-sm toggle-primary"
                      checked={fd.autoRenew}
                      onChange={() => handleAutoRenewToggle(fd)}
                    />
                    Auto-renew
                  </label>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FD Calculator */}
        <div className="bg-base-200 rounded-box flex flex-col gap-4 p-4">
          <h2 className="text-lg font-semibold">FD Calculator</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className="text-base-content/60 text-sm">
                Deposit Amount
              </span>
              <input
                type="number"
                className="input input-bordered w-full"
                value={calcAmount}
                min={0}
                onChange={(e) => handleCalcAmountChange(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-base-content/60 text-sm">Tenure</span>
              <select
                className="select select-bordered w-full"
                value={calcTenure}
                onChange={(e) => setCalcTenure(Number(e.target.value))}>
                {TENURE_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m} months
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-base-content/60 text-sm">
                Interest Rate (% p.a.)
              </span>
              <input
                type="number"
                className="input input-bordered w-full"
                value={calcRate}
                min={0}
                step={0.1}
                onChange={(e) => handleCalcRateChange(e.target.value)}
              />
            </label>
          </div>
          <div className="border-base-300 mt-2 grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <div className="text-base-content/60 text-sm">
                Maturity Amount
              </div>
              <div className="text-success text-xl font-bold">
                {formatCurrency(calcMaturity)}
              </div>
            </div>
            <div>
              <div className="text-base-content/60 text-sm">
                Total Interest Earned
              </div>
              <div className="text-primary text-xl font-bold">
                {formatCurrency(calcInterest)}
              </div>
            </div>
          </div>
        </div>

        {/* FD vs RD Comparison */}
        <div className="bg-base-200 rounded-box flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">FD vs RD Comparison</h2>
            <button
              className="btn btn-neutral btn-sm"
              onClick={() => setShowComparison(!showComparison)}>
              {showComparison ? 'Hide' : 'Show'} Comparison
            </button>
          </div>
          {showComparison && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="border-primary rounded-box border p-4">
                <h3 className="mb-2 font-semibold">Fixed Deposit</h3>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="text-base-content/60">
                    One-time deposit:{' '}
                    <span className="text-base-content font-medium">
                      {formatCurrency(calcAmount)}
                    </span>
                  </div>
                  <div className="text-base-content/60">
                    Tenure:{' '}
                    <span className="text-base-content font-medium">
                      {calcTenure} months
                    </span>
                  </div>
                  <div className="text-base-content/60">
                    Rate:{' '}
                    <span className="text-base-content font-medium">
                      {calcRate}% p.a.
                    </span>
                  </div>
                  <div className="mt-2 border-t pt-2">
                    <div className="text-base-content/60">Maturity amount</div>
                    <div className="text-success text-lg font-bold">
                      {formatCurrency(calcMaturity)}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/60">Interest earned</div>
                    <div className="text-primary text-lg font-bold">
                      {formatCurrency(calcInterest)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-secondary rounded-box border p-4">
                <h3 className="mb-2 font-semibold">Recurring Deposit</h3>
                <div className="flex flex-col gap-1 text-sm">
                  <div className="text-base-content/60">
                    Monthly deposit:{' '}
                    <span className="text-base-content font-medium">
                      {formatCurrency(rdComparison.monthlyDeposit)}
                    </span>
                  </div>
                  <div className="text-base-content/60">
                    Tenure:{' '}
                    <span className="text-base-content font-medium">
                      {calcTenure} months
                    </span>
                  </div>
                  <div className="text-base-content/60">
                    Rate:{' '}
                    <span className="text-base-content font-medium">
                      {calcRate}% p.a.
                    </span>
                  </div>
                  <div className="mt-2 border-t pt-2">
                    <div className="text-base-content/60">Maturity amount</div>
                    <div className="text-success text-lg font-bold">
                      {formatCurrency(rdComparison.maturityAmount)}
                    </div>
                  </div>
                  <div>
                    <div className="text-base-content/60">Interest earned</div>
                    <div className="text-primary text-lg font-bold">
                      {formatCurrency(rdComparison.totalInterest)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showComparison && (
            <div className="text-base-content/60 text-sm">
              <span className="font-medium">Note:</span> FD earns higher returns
              as the full amount is invested from day one, while RD builds the
              corpus gradually through monthly contributions.
            </div>
          )}
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default FixedDepositsPage;
