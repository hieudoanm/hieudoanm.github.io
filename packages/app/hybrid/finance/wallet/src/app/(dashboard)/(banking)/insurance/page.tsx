'use client';

import { useMemo } from 'react';
import { DashboardTemplate } from '@/components/templates';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { formatCurrency, formatDate } from '@/utils/format';
import Skeleton, {
  SkeletonCard,
  SkeletonText,
} from '@/components/atoms/Skeleton';
import { FiShield } from 'react-icons/fi';

const typeColors: Record<string, string> = {
  life: 'badge-info',
  health: 'badge-success',
  auto: 'badge-warning',
  home: 'badge-accent',
};

const InsurancePage = () => {
  const { insurance, loading } = useData();
  const { showToast } = useToast();

  console.log('[InsurancePage] render', { loading, count: insurance.length });

  const activePolicies = useMemo(
    () => insurance.filter((i) => i.status === 'active'),
    [insurance]
  );
  const totalCoverage = useMemo(
    () => activePolicies.reduce((s, i) => s + i.coverageAmount, 0),
    [activePolicies]
  );
  const monthlyPremiums = useMemo(
    () =>
      activePolicies.reduce(
        (s, i) =>
          s + (i.premiumFrequency === 'yearly' ? i.premium / 12 : i.premium),
        0
      ),
    [activePolicies]
  );
  const totalInsured = useMemo(
    () => insurance.reduce((s, i) => s + i.coverageAmount, 0),
    [insurance]
  );

  const coverageByType = useMemo(() => {
    const types = ['life', 'health', 'auto', 'home'] as const;
    return types.map((t) => ({
      type: t,
      coverage: activePolicies
        .filter((i) => i.type === t)
        .reduce((s, i) => s + i.coverageAmount, 0),
    }));
  }, [activePolicies]);

  const maxCoverage = Math.max(...coverageByType.map((c) => c.coverage), 1);

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

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              <FiShield /> Insurance
            </h1>
            <p className="text-base-content/60">Manage your policies</p>
          </div>
          <button className="btn btn-primary btn-sm">Browse Plans</button>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Coverage</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalCoverage)}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Active Policies</div>
            <div className="stat-value text-2xl">{activePolicies.length}</div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Monthly Premiums</div>
            <div className="stat-value text-2xl">
              {formatCurrency(monthlyPremiums)}
            </div>
          </div>
          <div className="stat bg-base-200 rounded-box shadow-sm">
            <div className="stat-title">Total Insured</div>
            <div className="stat-value text-2xl">
              {formatCurrency(totalInsured)}
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Coverage by Type</h2>
          <div className="flex flex-col gap-2">
            {coverageByType.map((c) => (
              <div key={c.type} className="flex items-center gap-3">
                <span className="w-16 text-sm capitalize">{c.type}</span>
                <div className="bg-base-300 h-4 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all"
                    style={{
                      width: `${maxCoverage ? (c.coverage / maxCoverage) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-24 text-right text-sm font-medium">
                  {formatCurrency(c.coverage)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold">Your Policies</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {insurance.map((policy) => (
              <div key={policy.id} className="card bg-base-200 shadow-md">
                <div className="card-body gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="card-title text-sm">{policy.name}</h3>
                    <span
                      className={`badge badge-sm ${typeColors[policy.type] ?? 'badge-neutral'}`}>
                      {policy.type}
                    </span>
                  </div>
                  <p className="text-base-content/60 text-xs">
                    {policy.provider}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-base-content/60 text-xs">Coverage</p>
                      <p className="font-medium">
                        {formatCurrency(policy.coverageAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-base-content/60 text-xs">Premium</p>
                      <p className="font-medium">
                        {formatCurrency(policy.premium)}/
                        {policy.premiumFrequency}
                      </p>
                    </div>
                    <div>
                      <p className="text-base-content/60 text-xs">Policy #</p>
                      <p className="font-mono text-xs">{policy.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-base-content/60 text-xs">Status</p>
                      <span
                        className={`badge badge-sm ${
                          policy.status === 'active'
                            ? 'badge-success'
                            : policy.status === 'expired'
                              ? 'badge-error'
                              : 'badge-warning'
                        }`}>
                        {policy.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-base-content/60 text-xs">Start</p>
                      <p className="text-xs">{formatDate(policy.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-base-content/60 text-xs">End</p>
                      <p className="text-xs">{formatDate(policy.endDate)}</p>
                    </div>
                  </div>

                  {policy.status === 'active' && (
                    <button
                      className="btn btn-primary btn-sm w-full"
                      onClick={() =>
                        showToast(
                          `${policy.name} premium payment simulated`,
                          'success'
                        )
                      }>
                      Pay Premium
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardTemplate>
  );
};

export default InsurancePage;
