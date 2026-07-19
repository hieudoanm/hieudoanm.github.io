'use client';

import StatCard from '@/components/atoms/StatCard';
import ErrorState from '@/components/molecules/ErrorState';
import LoadingState from '@/components/molecules/LoadingState';
import RankingList from '@/components/molecules/RankingList';
import YearChart from '@/components/molecules/YearChart';
import { useDoi } from '@/providers/DoiProvider';
import { FC } from 'react';
import {
  FiBookmark,
  FiCalendar,
  FiGitMerge,
  FiHash,
  FiUsers,
} from 'react-icons/fi';

const OverviewPage: FC = () => {
  const { loading, error, report, query, setQuery } = useDoi();

  if (error) return <ErrorState />;
  if (loading || !report) return <LoadingState />;

  const {
    overview: s,
    yearDistribution,
    mostCited,
    mostCiting,
    topAuthors,
  } = report;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-8 flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold sm:text-3xl">Overview</h1>
          <p className="text-base-content/60 text-sm">
            Citation statistics {query && <>matching &quot;{query}&quot;</>}
          </p>
        </div>
        <div className="form-control w-full md:w-64">
          <input
            type="text"
            placeholder="Search works..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-bordered input-sm"
            aria-label="Search works"
          />
        </div>
      </header>

      <section
        className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        data-testid="overview-stats">
        <StatCard label="Total works" value={s.totalWorks} icon={<FiHash />} />
        <StatCard
          label="Titled works"
          value={s.titledWorks}
          icon={<FiBookmark />}
        />
        <StatCard
          label="Reference edges"
          value={s.referenceEdges}
          icon={<FiGitMerge />}
        />
        <StatCard
          label="Distinct authors"
          value={s.distinctAuthors}
          icon={<FiUsers />}
        />
        <StatCard
          label="Year span"
          value={`${s.earliestYear}–${s.latestYear}`}
          icon={<FiCalendar />}
        />
        <StatCard
          label="Avg refs / titled"
          value={s.avgRefsPerTitled.toFixed(1)}
          icon={<FiGitMerge />}
        />
      </section>

      <section className="card bg-base-200 card-body mb-8">
        <h2 className="mb-2 font-semibold">Year distribution</h2>
        <YearChart data={yearDistribution} />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="min-w-0">
          <RankingList title="Most cited" rows={mostCited} />
        </div>
        <div className="min-w-0">
          <RankingList title="Most citing" rows={mostCiting} />
        </div>
        <div className="min-w-0">
          <div className="card bg-base-200 card-body min-w-0">
            <h3 className="mb-3 font-semibold">Top authors</h3>
            {topAuthors.length === 0 ? (
              <p className="text-base-content/50 text-sm">No data.</p>
            ) : (
              <ol className="space-y-2">
                {topAuthors.map((a, i) => (
                  <li key={a.author} className="flex items-start gap-3 text-sm">
                    <span className="text-base-content/40 mt-0.5 w-5 shrink-0 text-right">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium" title={a.author}>
                        {a.author}
                      </p>
                      <p className="text-base-content/50 text-xs">
                        {a.count} work{a.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default OverviewPage;
