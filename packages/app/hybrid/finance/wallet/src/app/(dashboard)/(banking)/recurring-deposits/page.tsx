'use client';

import { useState, useMemo, type FC } from 'react';
import { DashboardTemplate } from '@/components/templates';
import Skeleton, { SkeletonText } from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { formatCurrency, formatDate } from '@/utils/format';
import {
  FiPlus,
  FiDollarSign,
  FiTrendingUp,
  FiClock,
  FiPercent,
} from 'react-icons/fi';
import type { RecurringDeposit } from '@/types';

const TENURE_OPTIONS = [12, 24, 36, 48, 60] as const;

const RecurringDepositsPage: FC = () => {
  const { recurringDeposits, loading } = useData();

  const [calcMonthly, setCalcMonthly] = useState<number>(500);
  const [calcTenure, setCalcTenure] = useState<number>(24);
  const [calcRate, setCalcRate] = useState<number>(7.5);

  console.log('[RecurringDepositsPage] render', {
    loading,
    count: recurringDeposits.length,
  });

  const stats = useMemo(() => {
    const active = recurringDeposits.filter((rd) => rd.status === 'active');
    const totalSaved = active.reduce(
      (sum, rd) => sum + rd.monthlyAmount * rd.depositsCompleted,
      0
    );
    const expectedMaturity = active.reduce(
      (sum, rd) => sum + rd.maturityAmount,
      0
    );
    const avgRate =
      active.length > 0
        ? active.reduce((sum, rd) => sum + rd.interestRate, 0) / active.length
        : 0;
    return {
      totalSaved,
      expectedMaturity,
      activeCount: active.length,
      avgRate,
    };
  }, [recurringDeposits]);

  const calcResult = useMemo(() => {
    const monthlyRate = calcRate / 100 / 12;
    const maturityAmount =
      monthlyRate > 0
        ? calcMonthly *
          ((Math.pow(1 + monthlyRate, calcTenure) - 1) / monthlyRate) *
          (1 + monthlyRate)
        : calcMonthly * calcTenure;
    const totalDeposited = calcMonthly * calcTenure;
    const totalInterest = maturityAmount - totalDeposited;
    return { maturityAmount, totalInterest, totalDeposited };
  }, [calcMonthly, calcTenure, calcRate]);

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/4" />
            <SkeletonText className="w-1/3" />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const renderDepositHistory = (rd: RecurringDeposit) => {
    const months = Array.from({ length: rd.tenureMonths }, (_, i) => {
      if (i < rd.depositsCompleted) return 'paid';
      if (i === rd.depositsCompleted) return 'upcoming';
      return 'pending';
    });

    return (
      <div className="flex flex-wrap gap-1">
        {months.map((status, i) => (
          <div
            key={i}
            className={`h-2.5 w-2.5 rounded-full ${
              status === 'paid'
                ? 'bg-success'
                : status === 'upcoming'
                  ? 'bg-warning'
                  : 'bg-base-300'
            }`}
            title={`Month ${i + 1}: ${status}`}
          />
        ))}
      </div>
    );
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Recurring Deposits</h1>
            <p className="text-base-content/60">
              Grow your savings with systematic monthly deposits
            </p>
          </div>
          <button className="btn btn-primary btn-sm gap-1">
            <FiPlus /> New RD
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="stat bg-base-200 rounded-xl p-4">
            <div className="stat-title text-xs">Total Saved</div>
            <div className="stat-value text-lg">
              {formatCurrency(stats.totalSaved)}
            </div>
            <div className="stat-desc flex items-center gap-1">
              <FiDollarSign className="text-xs" /> Across all RDs
            </div>
          </div>
          <div className="stat bg-base-200 rounded-xl p-4">
            <div className="stat-title text-xs">Expected Maturity</div>
            <div className="stat-value text-lg">
              {formatCurrency(stats.expectedMaturity)}
            </div>
            <div className="stat-desc flex items-center gap-1">
              <FiTrendingUp className="text-xs" /> At maturity
            </div>
          </div>
          <div className="stat bg-base-200 rounded-xl p-4">
            <div className="stat-title text-xs">Active RDs</div>
            <div className="stat-value text-lg">{stats.activeCount}</div>
            <div className="stat-desc flex items-center gap-1">
              <FiClock className="text-xs" /> Currently running
            </div>
          </div>
          <div className="stat bg-base-200 rounded-xl p-4">
            <div className="stat-title text-xs">Avg Interest Rate</div>
            <div className="stat-value text-lg">
              {stats.avgRate.toFixed(2)}%
            </div>
            <div className="stat-desc flex items-center gap-1">
              <FiPercent className="text-xs" /> Weighted average
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Active RDs</h2>
          {recurringDeposits.filter((rd) => rd.status === 'active').length ===
          0 ? (
            <div className="py-8 text-center">
              <FiClock className="text-base-content/30 mx-auto mb-3 text-4xl" />
              <p className="text-base-content/60">
                No active recurring deposits
              </p>
              <p className="text-base-content/40 text-sm">
                Start a new RD to begin saving
              </p>
            </div>
          ) : (
            recurringDeposits
              .filter((rd) => rd.status === 'active')
              .map((rd) => (
                <div key={rd.id} className="card bg-base-200 shadow-sm">
                  <div className="card-body gap-3 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{rd.name}</h3>
                        <p className="text-base-content/60 text-sm">
                          {formatCurrency(rd.monthlyAmount)}/month · Started{' '}
                          {formatDate(rd.startDate)}
                        </p>
                      </div>
                      <div className="badge badge-success badge-sm">
                        {rd.status}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <div className="badge badge-primary badge-outline badge-sm">
                        {rd.interestRate}% p.a.
                      </div>
                      <span className="text-base-content/60 text-xs">
                        {rd.depositsCompleted}/{rd.tenureMonths} months
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="text-base-content/60 text-xs">
                        Deposit Progress
                      </div>
                      <progress
                        className="progress progress-primary w-full"
                        value={rd.depositsCompleted}
                        max={rd.tenureMonths}
                      />
                    </div>

                    {renderDepositHistory(rd)}

                    <div className="border-base-300 flex items-center justify-between border-t pt-2">
                      <span className="text-base-content/60 text-sm">
                        Maturity Amount
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(rd.maturityAmount, rd.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        <div className="card bg-base-200 shadow-sm">
          <div className="card-body gap-4">
            <h2 className="card-title text-lg">RD Calculator</h2>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <label className="floating-label">
                <span>Monthly Amount</span>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={calcMonthly}
                  min={1}
                  onChange={(e) => setCalcMonthly(Number(e.target.value))}
                />
              </label>

              <label className="floating-label">
                <span>Tenure (Months)</span>
                <select
                  className="select select-bordered w-full"
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}>
                  {TENURE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t} months
                    </option>
                  ))}
                </select>
              </label>

              <label className="floating-label">
                <span>Interest Rate (%)</span>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={calcRate}
                  min={0}
                  step={0.1}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div className="bg-base-300 rounded-xl p-4 text-center">
                <div className="text-base-content/60 text-xs">
                  Total Deposited
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(calcResult.totalDeposited)}
                </div>
              </div>
              <div className="bg-base-300 rounded-xl p-4 text-center">
                <div className="text-base-content/60 text-xs">
                  Total Interest
                </div>
                <div className="text-success text-lg font-bold">
                  {formatCurrency(calcResult.totalInterest)}
                </div>
              </div>
              <div className="bg-base-300 rounded-xl p-4 text-center">
                <div className="text-base-content/60 text-xs">
                  Maturity Amount
                </div>
                <div className="text-primary text-lg font-bold">
                  {formatCurrency(calcResult.maturityAmount)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default RecurringDepositsPage;
