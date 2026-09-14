'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { NextPage } from 'next';
import { StrategyList } from '@/components/molecules/StrategyList';
import { STRATEGIES } from '@/games/economics/prisoners-dilemma/constants';

const BotsPage: NextPage = () => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return STRATEGIES;
    return STRATEGIES.filter((s) =>
      [s.label, s.id, s.description, s.behavior].some((field) =>
        field.toLowerCase().includes(needle)
      )
    );
  }, [query]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
      <Link
        href="/economics/prisoners-dilemma"
        className="text-primary text-sm hover:underline">
        ← Back to Theory
      </Link>
      <input
        type="search"
        placeholder="Search bots by name, behaviour or description…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        data-testid="bots-search"
        className="input input-sm input-bordered w-full"
      />
      <p className="text-base-content/60 text-sm">
        Showing {filtered.length} of {STRATEGIES.length} bots
      </p>
      <StrategyList strategies={filtered} />
      {filtered.length === 0 && (
        <p className="text-base-content/60 text-sm">
          No bots match your search.
        </p>
      )}
    </div>
  );
};

export default BotsPage;
