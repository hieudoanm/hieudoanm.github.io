'use client';

import { useMemo, useState } from 'react';
import { DashboardTemplate } from '@/components/templates';
import Skeleton, {
  SkeletonText,
  SkeletonCard,
} from '@/components/atoms/Skeleton';
import { useData } from '@/providers/DataProvider';
import { formatCurrency, formatDate } from '@/utils/format';
import {
  FiPlus,
  FiDollarSign,
  FiClock,
  FiTrendingUp,
  FiPercent,
} from 'react-icons/fi';
import type { FC } from 'react';
import type { Loan } from '@/types';

const TYPE_BADGES: Record<Loan['type'], string> = {
  personal: 'badge-primary',
  auto: 'badge-secondary',
  home: 'badge-accent',
  education: 'badge-info',
};

const LOAN_PRODUCTS = [
  {
    name: 'Personal Loan',
    rateRange: '8.5% - 14%',
    tenureRange: '12 - 60',
    maxAmount: '50,000',
  },
  {
    name: 'Auto Loan',
    rateRange: '5.5% - 9%',
    tenureRange: '12 - 72',
    maxAmount: '100,000',
  },
  {
    name: 'Home Loan',
    rateRange: '4% - 7.5%',
    tenureRange: '120 - 360',
    maxAmount: '500,000',
  },
  {
    name: 'Education Loan',
    rateRange: '6% - 12%',
    tenureRange: '12 - 84',
    maxAmount: '75,000',
  },
];

const calculateEMI = (
  principal: number,
  annualRate: number,
  months: number
): number => {
  if (annualRate === 0 || months === 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
};

const LoansPage: FC = () => {
  const { loans, loading } = useData();

  const [calcAmount, setCalcAmount] = useState(25000);
  const [calcRate, setCalcRate] = useState(8);
  const [calcTenure, setCalcTenure] = useState(36);

  console.log('[LoansPage] render', { loading, count: loans.length });

  const activeLoans = useMemo(
    () => loans.filter((l) => l.status === 'active'),
    [loans]
  );
  const closedLoans = useMemo(
    () => loans.filter((l) => l.status === 'closed'),
    [loans]
  );

  const totalBorrowed = useMemo(
    () => activeLoans.reduce((sum, l) => sum + l.principal, 0),
    [activeLoans]
  );
  const monthlyEMI = useMemo(
    () => activeLoans.reduce((sum, l) => sum + l.emi, 0),
    [activeLoans]
  );
  const totalInterest = useMemo(
    () =>
      activeLoans.reduce(
        (sum, l) =>
          sum + l.principal * (l.interestRate / 100) * (l.tenureMonths / 12),
        0
      ),
    [activeLoans]
  );

  const calcEMI = useMemo(
    () => calculateEMI(calcAmount, calcRate, calcTenure),
    [calcAmount, calcRate, calcTenure]
  );
  const calcTotalInterest = useMemo(
    () => calcEMI * calcTenure - calcAmount,
    [calcEMI, calcTenure, calcAmount]
  );
  const calcTotalCost = useMemo(
    () => calcEMI * calcTenure,
    [calcEMI, calcTenure]
  );

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <SkeletonText className="h-7 w-1/5" />
            <SkeletonText className="w-1/4" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="h-24" />
            ))}
          </div>
          <SkeletonCard className="h-48" />
          <SkeletonCard className="h-48" />
        </div>
      </DashboardTemplate>
    );
  }

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Loans</h1>
            <p className="text-base-content/60">Manage your loans and EMIs</p>
          </div>
          <button className="btn btn-primary btn-sm gap-1">
            <FiPlus /> Apply for Loan
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Borrowed</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalBorrowed)}
            </div>
            <div className="stat-desc">
              {activeLoans.length} active loan
              {activeLoans.length !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Monthly EMI</div>
            <div className="stat-value text-2xl">
              {formatCurrency(monthlyEMI)}
            </div>
            <div className="stat-desc">total per month</div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Active Loans</div>
            <div className="stat-value text-2xl">{activeLoans.length}</div>
            <div className="stat-desc">{closedLoans.length} closed</div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Interest</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalInterest)}
            </div>
            <div className="stat-desc">estimated</div>
          </div>
        </div>

        {activeLoans.length === 0 ? (
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center">
              <FiDollarSign className="text-base-content/30 text-4xl" />
              <p className="text-base-content/60">No active loans</p>
              <button className="btn btn-primary btn-sm mt-2 gap-1">
                <FiPlus /> Apply for Loan
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {activeLoans.map((loan) => {
              const progress =
                loan.tenureMonths > 0
                  ? (loan.paidEmis / loan.tenureMonths) * 100
                  : 0;
              const nextDate = new Date();
              nextDate.setMonth(nextDate.getMonth() + 1);
              const nextEMIDate = nextDate.toISOString().split('T')[0];

              return (
                <div key={loan.id} className="card bg-base-200 shadow-sm">
                  <div className="card-body gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{loan.name}</h3>
                        <span
                          className={`badge badge-sm ${TYPE_BADGES[loan.type]}`}>
                          {loan.type}
                        </span>
                        {loan.status === 'overdue' && (
                          <span className="badge badge-sm badge-error">
                            overdue
                          </span>
                        )}
                      </div>
                      <span className="text-sm">{loan.interestRate}% p.a.</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-base-content/60 text-xs">
                          Outstanding
                        </p>
                        <p className="font-semibold">
                          {formatCurrency(loan.outstanding, loan.currency)}
                        </p>
                      </div>
                      <div>
                        <p className="text-base-content/60 text-xs">EMI</p>
                        <p className="font-semibold">
                          {formatCurrency(loan.emi, loan.currency)}
                        </p>
                      </div>
                      <div>
                        <p className="text-base-content/60 text-xs">
                          Paid EMIs
                        </p>
                        <p className="font-semibold">
                          {loan.paidEmis} / {loan.tenureMonths}
                        </p>
                      </div>
                      <div>
                        <p className="text-base-content/60 text-xs">Next EMI</p>
                        <p className="font-semibold">
                          {formatDate(nextEMIDate)}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs">
                        <span>Repayment Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <progress
                        className="progress progress-primary mt-1 w-full"
                        value={loan.paidEmis}
                        max={loan.tenureMonths}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="card bg-base-200 shadow-sm">
          <div className="card-body gap-4">
            <h2 className="card-title">
              <FiTrendingUp /> EMI Calculator
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <label>Loan Amount</label>
                  <span className="font-semibold">
                    {formatCurrency(calcAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="500"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="range range-primary w-full"
                />
                <div className="text-base-content/50 flex justify-between text-xs">
                  <span>$1,000</span>
                  <span>$100,000</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <label>Interest Rate (% p.a.)</label>
                  <span className="font-semibold">{calcRate}%</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="20"
                  step="0.5"
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  className="range range-primary w-full"
                />
                <div className="text-base-content/50 flex justify-between text-xs">
                  <span>4%</span>
                  <span>20%</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <label>Tenure (months)</label>
                  <span className="font-semibold">{calcTenure} months</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="1"
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  className="range range-primary w-full"
                />
                <div className="text-base-content/50 flex justify-between text-xs">
                  <span>12</span>
                  <span>84</span>
                </div>
              </div>
            </div>

            <div className="divider my-0" />

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-base-content/60 text-xs">Monthly EMI</p>
                <p className="text-primary text-lg font-bold">
                  {formatCurrency(calcEMI)}
                </p>
              </div>
              <div>
                <p className="text-base-content/60 text-xs">Total Interest</p>
                <p className="text-secondary text-lg font-bold">
                  {formatCurrency(calcTotalInterest)}
                </p>
              </div>
              <div>
                <p className="text-base-content/60 text-xs">Total Cost</p>
                <p className="text-accent text-lg font-bold">
                  {formatCurrency(calcTotalCost)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-sm">
          <div className="card-body gap-4">
            <h2 className="card-title">Loan Comparison</h2>
            <div className="overflow-x-auto">
              <table className="table-zebra table-sm w-full">
                <thead>
                  <tr>
                    <th>Loan Product</th>
                    <th>Rate Range</th>
                    <th>Tenure (months)</th>
                    <th>Max Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {LOAN_PRODUCTS.map((product) => (
                    <tr key={product.name}>
                      <td className="font-medium">{product.name}</td>
                      <td>{product.rateRange}</td>
                      <td>{product.tenureRange}</td>
                      <td>${product.maxAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default LoansPage;
