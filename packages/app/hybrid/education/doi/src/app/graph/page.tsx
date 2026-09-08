'use client';

import CitationGraph from '@/components/molecules/CitationGraph';
import ErrorState from '@/components/molecules/ErrorState';
import LoadingState from '@/components/molecules/LoadingState';
import { useDoi } from '@/providers/DoiProvider';
import { FC } from 'react';

const GraphPage: FC = () => {
  const {
    loading,
    error,
    query,
    setQuery,
    graphNodes,
    graphEdges,
    graphLimit,
    setGraphLimit,
    minDegree,
    setMinDegree,
  } = useDoi();

  if (error) return <ErrorState />;
  if (loading) return <LoadingState />;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-1 text-3xl font-bold">Citation graph</h1>
          <p className="text-base-content/60 text-sm">
            Nodes sized by in-degree · click to inspect · {graphNodes.length}{' '}
            works, {graphEdges.length} edges
            {query && <> matching &quot;{query}&quot;</>}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="form-control">
            <input
              type="number"
              min={1}
              value={graphLimit}
              onChange={(e) =>
                setGraphLimit(Math.max(1, Number(e.target.value) || 1))
              }
              className="input input-bordered input-sm w-24"
              aria-label="Node cap"
              title="Node cap"
            />
          </div>
          <div className="form-control">
            <select
              value={minDegree}
              onChange={(e) => setMinDegree(Number(e.target.value))}
              className="select select-bordered select-sm"
              aria-label="Minimum in-degree">
              {[0, 1, 2, 5, 10, 20, 50].map((d) => (
                <option key={d} value={d}>
                  {d === 0 ? 'Any degree' : `≥ ${d} citations`}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-64">
            <input
              type="text"
              placeholder="Filter graph..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input input-bordered input-sm"
              aria-label="Filter graph"
            />
          </div>
        </div>
      </header>

      {graphNodes.length === 0 ? (
        <p className="text-base-content/50 py-12 text-center">
          No works to render{query ? ' for the current filter' : ''}.
        </p>
      ) : (
        <CitationGraph nodes={graphNodes} edges={graphEdges} />
      )}
    </main>
  );
};

export default GraphPage;
