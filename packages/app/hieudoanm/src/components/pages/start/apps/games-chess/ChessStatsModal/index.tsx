import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js';
import type { FC } from 'react';
import { useCallback, useState } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { AnalysisSection } from './components/Analysis';
import { PercentileModal } from './components/PercentileModal';
import { SearchBar } from './components/SearchBar';
import { StatCard } from './components/StatCard';
import { COMPARISON_TABS } from './constants';
import analysis from './data/analysis.json';
import type { ComparisonTab, PlayerRatings, TitleKey } from './types';
import { calcPercentile } from './utils/percentile';
import { useSQLite } from './utils/sql';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const ChessStatsModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { db, dbLoading, dbError } = useSQLite('/db/chess.db');
  const [username, setUsername] = useState('redeyesdarknessmetaldrago');
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [comparisonTabs, setComparisonTabs] = useState<ComparisonTab[] | null>(
    null
  );
  const [searchedUsername, setSearchedUsername] = useState('');

  const handleSearch = useCallback(async () => {
    if (!username.trim() || !db) return;
    setSearching(true);
    setSearchError(null);
    setComparisonTabs(null);

    try {
      const res = await fetch(
        `https://api.chess.com/pub/player/${username.trim()}/stats`
      );
      if (!res.ok) throw new Error(`Player not found (${res.status})`);
      const stats = await res.json();

      const ratings: PlayerRatings = {
        bullet: {
          last: stats.chess_bullet?.last?.rating ?? 0,
          best: stats.chess_bullet?.best?.rating ?? 0,
        },
        blitz: {
          last: stats.chess_blitz?.last?.rating ?? 0,
          best: stats.chess_blitz?.best?.rating ?? 0,
        },
        rapid: {
          last: stats.chess_rapid?.last?.rating ?? 0,
          best: stats.chess_rapid?.best?.rating ?? 0,
        },
      };

      setSearchedUsername(username.trim());

      const tabs: ComparisonTab[] = COMPARISON_TABS.map((tab) => ({
        key: tab.key,
        label: tab.label,
        description: tab.description,
        results: (['bullet', 'blitz', 'rapid'] as const).map((fmt) =>
          calcPercentile(
            db,
            fmt,
            ratings[fmt].best,
            tab.key === 'all' ? undefined : (tab.key as TitleKey)
          )
        ),
      }));

      setComparisonTabs(tabs);
    } catch (err) {
      setSearchError((err as Error).message);
    } finally {
      setSearching(false);
    }
  }, [username, db]);

  const { count, histogram } = analysis ?? { count: {}, histogram: {} };
  const { total, ...titleCounts } = count as Record<string, number>;

  return (
    <FullScreen onClose={onClose} title="Chess Insights">
      <div className="flex-1 overflow-y-auto px-12 py-16">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-bold">Chess Insights</h1>
            <p className="text-base-content/50 mt-2 text-sm">
              Player distribution by title and rating
            </p>
          </div>

          <SearchBar
            username={username}
            onUsernameChange={setUsername}
            onSearch={handleSearch}
            searching={searching}
            dbLoading={dbLoading}
            dbError={dbError}
            searchError={searchError}
          />
        </div>

        {total !== undefined && (
          <div className="mb-12">
            <StatCard label="Total Players" value={total} />
          </div>
        )}

        <AnalysisSection
          analysis={analysis}
          dbLoading={dbLoading}
          titleCounts={titleCounts}
          histogram={histogram}
        />

        {comparisonTabs && (
          <PercentileModal
            username={searchedUsername}
            tabs={comparisonTabs}
            onClose={() => setComparisonTabs(null)}
          />
        )}
      </div>
    </FullScreen>
  );
};
