'use client';

import { useState, useMemo } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { useData } from '@/providers/DataProvider';
import { formatCurrency, formatDate } from '@/utils/format';
import Skeleton, {
  SkeletonCard,
  SkeletonText,
} from '@/components/atoms/Skeleton';
import { FiTarget, FiPlus, FiX } from 'react-icons/fi';

const categoryColors: Record<string, string> = {
  vacation: 'badge-info',
  emergency: 'badge-warning',
  education: 'badge-primary',
  wedding: 'badge-accent',
  custom: 'badge-neutral',
};

const SavingsGoalsPage = () => {
  const { savingsGoals, updateSavingsGoal, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: 'custom' as const,
    targetAmount: '',
    monthlyContribution: '',
    targetDate: '',
  });

  console.log('[SavingsGoalsPage] render', {
    loading,
    count: savingsGoals.length,
  });

  const totalSaved = useMemo(
    () => savingsGoals.reduce((s, g) => s + g.savedAmount, 0),
    [savingsGoals]
  );
  const totalTarget = useMemo(
    () => savingsGoals.reduce((s, g) => s + g.targetAmount, 0),
    [savingsGoals]
  );
  const overallPct = totalTarget
    ? Math.round((totalSaved / totalTarget) * 100)
    : 0;

  if (loading) {
    return (
      <DashboardTemplate>
        <div className="flex flex-col gap-6">
          <SkeletonText className="h-7 w-1/5" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="h-24" />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} className="h-48" />
            ))}
          </div>
        </div>
      </DashboardTemplate>
    );
  }

  const handleAdd = () => {
    if (!form.name || !form.targetAmount) return;
    console.log('[SavingsGoalsPage] addGoal', form);
    const goal = {
      id: String(Date.now()),
      name: form.name,
      category: form.category,
      targetAmount: Number(form.targetAmount),
      savedAmount: 0,
      currency: 'USD',
      targetDate: form.targetDate || '2028-01-01',
      monthlyContribution: Number(form.monthlyContribution) || 0,
      priority: savingsGoals.length + 1,
    };
    updateSavingsGoal(goal);
    setForm({
      name: '',
      category: 'custom',
      targetAmount: '',
      monthlyContribution: '',
      targetDate: '',
    });
    setShowModal(false);
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <FiTarget /> Savings Goals
            </h1>
            <p className="text-base-content/60">Track your savings progress</p>
          </div>
          <button
            className="btn btn-primary btn-sm gap-1"
            onClick={() => setShowModal(true)}>
            <FiPlus /> New Goal
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Goals</div>
            <div className="stat-value text-2xl">{savingsGoals.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Saved</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalSaved)}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Target</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalTarget)}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Overall Progress</div>
            <div className="stat-value text-2xl">{overallPct}%</div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {savingsGoals.map((goal) => {
            const pct = goal.targetAmount
              ? Math.round((goal.savedAmount / goal.targetAmount) * 100)
              : 0;
            const remaining = goal.targetAmount - goal.savedAmount;
            const daysLeft = Math.max(
              0,
              Math.ceil(
                (new Date(goal.targetDate).getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24)
              )
            );

            return (
              <div key={goal.id} className="card bg-base-200 shadow-md">
                <div className="card-body gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title">{goal.name}</h3>
                    <span
                      className={`badge badge-sm ${categoryColors[goal.category] ?? 'badge-neutral'}`}>
                      {goal.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative h-24 w-24 shrink-0">
                      <svg
                        className="h-full w-full -rotate-90"
                        viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className="stroke-base-300"
                          strokeWidth="3"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          fill="none"
                          className={
                            pct >= 75 ? 'stroke-success' : 'stroke-primary'
                          }
                          strokeWidth="3"
                          strokeDasharray={`${pct} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                        {pct}%
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                      <p>
                        <span className="text-base-content/60">Saved: </span>
                        <span className="font-bold">
                          {formatCurrency(goal.savedAmount)}
                        </span>
                        {' / '}
                        {formatCurrency(goal.targetAmount)}
                      </p>
                      <p className="text-base-content/60">
                        {formatCurrency(remaining)} remaining
                      </p>
                      <p className="text-base-content/60">
                        {formatCurrency(goal.monthlyContribution)}/mo
                        contribution
                      </p>
                    </div>
                  </div>

                  {pct >= 75 && (
                    <div className="alert alert-success py-2 text-sm">
                      <span>
                        You&apos;re almost there! Only{' '}
                        {formatCurrency(remaining)} to go.
                      </span>
                    </div>
                  )}

                  <div className="text-base-content/60 flex items-center justify-between text-xs">
                    <span>Target: {formatDate(goal.targetDate)}</span>
                    <span>{daysLeft} days left</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">New Savings Goal</h3>
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={() => setShowModal(false)}>
                  <FiX />
                </button>
              </div>
              <div className="flex flex-col gap-4 py-4">
                <div className="floating-label">
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder=" "
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <label>Goal Name</label>
                </div>
                <div className="floating-label">
                  <select
                    className="select select-bordered w-full"
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as typeof form.category,
                      })
                    }>
                    <option value="vacation">Vacation</option>
                    <option value="emergency">Emergency Fund</option>
                    <option value="education">Education</option>
                    <option value="wedding">Wedding</option>
                    <option value="custom">Custom</option>
                  </select>
                  <label>Category</label>
                </div>
                <div className="floating-label">
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder=" "
                    value={form.targetAmount}
                    onChange={(e) =>
                      setForm({ ...form, targetAmount: e.target.value })
                    }
                  />
                  <label>Target Amount ($)</label>
                </div>
                <div className="floating-label">
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder=" "
                    value={form.monthlyContribution}
                    onChange={(e) =>
                      setForm({ ...form, monthlyContribution: e.target.value })
                    }
                  />
                  <label>Monthly Contribution ($)</label>
                </div>
                <div className="floating-label">
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    placeholder=" "
                    value={form.targetDate}
                    onChange={(e) =>
                      setForm({ ...form, targetDate: e.target.value })
                    }
                  />
                  <label>Target Date</label>
                </div>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-neutral btn-sm"
                  onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleAdd}>
                  Create Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardTemplate>
  );
};

export default SavingsGoalsPage;
