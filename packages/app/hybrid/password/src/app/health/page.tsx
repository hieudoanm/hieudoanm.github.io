'use client';

import { type FC } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { checkStrength } from '@/data/models';
import { FiArrowLeft } from 'react-icons/fi';

const HealthContent: FC = () => {
  const router = useRouter();
  const { items } = useData();
  const weak = items.filter(
    (i) => i.password && checkStrength(i.password).score <= 2
  );
  const strong = items.filter(
    (i) => i.password && checkStrength(i.password).score >= 4
  );
  const total = items.filter((i) => i.password).length;
  const score = total === 0 ? 100 : Math.round((strong.length / total) * 100);

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
      <main className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="card bg-base-200 card-body text-center">
          <div
            className="radial-progress text-primary mx-auto"
            style={{ '--value': score } as React.CSSProperties}>
            {score}%
          </div>
          <p className="mt-2 font-semibold">Overall Score</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="card bg-base-200 card-body text-center">
            <span className="text-2xl font-bold">{total}</span>
            <span className="text-xs opacity-50">Total</span>
          </div>
          <div className="card bg-success/20 card-body text-center">
            <span className="text-success text-2xl font-bold">
              {strong.length}
            </span>
            <span className="text-xs opacity-50">Strong</span>
          </div>
          <div className="card bg-error/20 card-body text-center">
            <span className="text-error text-2xl font-bold">{weak.length}</span>
            <span className="text-xs opacity-50">Weak</span>
          </div>
        </div>
        {weak.length > 0 && (
          <div className="card bg-base-200 card-body">
            <h2 className="card-title text-error">Weak Passwords</h2>
            {weak.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between py-1 text-sm">
                <span>{i.title}</span>
                <span className="badge badge-error badge-sm">
                  {checkStrength(i.password!).label}
                </span>
              </div>
            ))}
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
