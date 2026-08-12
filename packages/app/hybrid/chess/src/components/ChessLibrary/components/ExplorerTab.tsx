import { FC, useMemo, useState } from 'react';
import { openings } from '../../../lib/chess/openings';
import { Chessboard } from '../../organisms/chess/ChessBoard';

interface MasterStats {
  white: number;
  draws: number;
  black: number;
}

export const ExplorerTab: FC = () => {
  const groups = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = [];
    for (const opening of openings) {
      if (!seen.has(opening.group)) {
        seen.add(opening.group);
        list.push(opening.group);
      }
    }
    return list.sort();
  }, []);

  const [group, setGroup] = useState<string>(groups[0] ?? '');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<(typeof openings)[number] | null>(
    null
  );
  const [stats, setStats] = useState<MasterStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return openings.filter(
      (o) =>
        (group === '' || o.group === group) &&
        (!q || o.name.toLowerCase().includes(q))
    );
  }, [group, query]);

  const loadMasterStats = async () => {
    if (!selected) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://explorer.lichess.ovh/masters?fen=${encodeURIComponent(selected.fen)}&moves=0`
      );
      if (!response.ok) throw new Error(`Explorer returned ${response.status}`);
      const data = (await response.json()) as MasterStats;
      setStats(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  const total = stats ? stats.white + stats.draws + stats.black : 0;
  const pct = (value: number) =>
    total ? Math.round((value / total) * 1000) / 10 : 0;

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4 p-4 lg:grid-cols-[1fr_340px]">
      <div className="card bg-base-200 p-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="select select-bordered select-sm w-64"
            aria-label="Opening group">
            <option value="">All groups</option>
            {groups.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search openings…"
            className="input input-bordered input-sm flex-1"
          />
        </div>
        <ul className="max-h-[52vh] space-y-1 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="py-4 text-center text-sm opacity-60">
              No openings match.
            </p>
          )}
          {filtered.map((opening) => (
            <li key={opening.eco + opening.name}>
              <button
                onClick={() => {
                  setSelected(opening);
                  setStats(null);
                }}
                className={`hover:bg-base-300 w-full rounded px-2 py-1 text-left text-xs ${
                  selected?.name === opening.name ? 'bg-base-300' : ''
                }`}>
                <span className="font-mono opacity-60">{opening.eco}</span>{' '}
                <span className="font-semibold">{opening.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="card bg-base-200 p-3">
        {selected ? (
          <>
            <h3 className="mb-1 text-sm font-semibold">{selected.name}</h3>
            <p className="mb-2 text-xs opacity-60">
              {selected.eco} · {selected.half_moves} half-moves ·{' '}
              {selected.first}
            </p>
            <Chessboard position={selected.fen} />
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={loadMasterStats}
                disabled={loading}
                className="btn btn-sm">
                {loading && (
                  <span className="loading loading-spinner loading-xs" />
                )}
                Load master stats
              </button>
            </div>
            {error && <p className="text-error mt-2 text-xs">{error}</p>}
            {stats && total > 0 && (
              <div className="mt-3 space-y-1 text-xs">
                <p className="opacity-70">
                  Masters ({total.toLocaleString()} games)
                </p>
                {[
                  {
                    label: 'White',
                    value: pct(stats.white),
                    color: 'bg-neutral',
                  },
                  {
                    label: 'Draw',
                    value: pct(stats.draws),
                    color: 'bg-warning',
                  },
                  {
                    label: 'Black',
                    value: pct(stats.black),
                    color: 'bg-base-300',
                  },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2">
                    <span className="w-12 opacity-70">{row.label}</span>
                    <div className="bg-base-100 h-2 flex-1 rounded">
                      <div
                        className={`h-2 rounded ${row.color}`}
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                    <span className="w-10 text-right tabular-nums">
                      {row.value}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="py-8 text-center text-sm opacity-60">
            Select an opening to preview it.
          </p>
        )}
      </div>
    </div>
  );
};
ExplorerTab.displayName = 'ExplorerTab';
