'use client';

import { type FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import {
  analyzeHealth,
  getSuggestions,
  recordHealthScore,
  readHealthTrend,
} from '@/lib/health';
import {
  severityBadge,
  StatCard,
  StrengthItemRow,
  TrendChart,
} from '@/components/molecules/HealthWidgets';
import { FiArrowLeft, FiShield, FiZap } from 'react-icons/fi';

const HealthContent: FC = () => {
  const router = useRouter();
  const { items, isLoading } = useData();
  const [trend, setTrend] = useState<number[]>([]);
  const report = analyzeHealth(items);
  const suggestions = getSuggestions(report);

  useEffect(() => {
    if (isLoading) return;
    const existing = readHealthTrend();
    setTrend(existing.length > 0 ? existing : recordHealthScore(report.score));
  }, [isLoading, report.score]);

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-lg font-bold">Password Health</h1>
      </header>
      <main className="mx-auto max-w-3xl space-y-6 p-6">
        <div className="card bg-base-200 card-body">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <div
                className="radial-progress text-primary"
                style={{ '--value': report.score } as React.CSSProperties}>
                {report.score}%
              </div>
              <p className="mt-2 text-sm font-semibold">Overall Score</p>
            </div>
            <div className="flex-1 pl-6">
              <div className="mb-1 flex items-center gap-2 text-sm font-semibold">
                <FiShield className="size-4" /> 14-day trend
              </div>
              <TrendChart scores={trend} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Total" value={report.total} />
          <StatCard
            label="Strong"
            value={report.strong}
            className="bg-success/20 text-success"
          />
          <StatCard
            label="Weak"
            value={report.weak}
            className="bg-error/20 text-error"
          />
          <StatCard
            label="Reused"
            value={report.reused.reduce((n, g) => n + g.count, 0)}
            className="bg-warning/20 text-warning"
          />
          <StatCard
            label="Breached"
            value={report.breached.length}
            className="bg-error/20 text-error"
          />
          <StatCard
            label="Old"
            value={report.old.length}
            className="bg-base-200"
          />
        </div>
        {report.reused.length > 0 && (
          <div className="card bg-base-200 card-body">
            <h2 className="card-title text-warning">Reused Passwords</h2>
            {report.reused.map((group) => (
              <div key={group.password} className="text-sm">
                <p className="text-base-content/70">
                  Used by {group.items.map((i) => i.title).join(', ')}
                </p>
              </div>
            ))}
          </div>
        )}
        {report.breached.length > 0 && (
          <div className="card bg-base-200 card-body">
            <h2 className="card-title text-error">Breached Passwords</h2>
            {report.breached.map((item) => (
              <StrengthItemRow key={item.id} item={item} />
            ))}
          </div>
        )}
        {report.old.length > 0 && (
          <div className="card bg-base-200 card-body">
            <h2 className="card-title">Old Passwords</h2>
            <p className="text-base-content/50 -mt-2 text-xs">
              Not changed in 90+ days
            </p>
            {report.old.map((item) => (
              <StrengthItemRow key={item.id} item={item} />
            ))}
          </div>
        )}
        {suggestions.length > 0 && (
          <div className="card bg-base-200 card-body">
            <h2 className="card-title">
              <FiZap className="size-5" /> Remediation Suggestions
            </h2>
            {suggestions.map((s) => (
              <div
                key={s.title}
                className="border-base-300 flex items-start gap-2 border-b py-2 text-sm last:border-b-0">
                <span
                  className={`badge badge-sm mt-0.5 ${severityBadge[s.severity]}`}>
                  {s.severity}
                </span>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-base-content/60">{s.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {suggestions.length === 0 && (
          <div className="card bg-base-200 card-body text-center">
            <p className="text-success text-sm">
              Great job! No remediation needed.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

const HealthPage: FC = () => (
  <Providers>
    <HealthContent />
  </Providers>
);
export default HealthPage;
