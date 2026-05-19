// components/sidebars/PassportTab.tsx
import { countries } from '@hieudoanm/data/countries';
import { ChangeEvent, FC, useState } from 'react';

type Country = {
  name: string;
  official_name: string;
  region: string;
  subregion: string;
  cca2: string;
  cca3: string;
  flag: string;
  rank: number;
};

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;

const ranked = (countries as Country[])
  .filter((c) => c.rank > 0)
  .sort((a, b) => a.rank - b.rank);

export const PassportTab: FC = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  const filtered = ranked.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.cca2.toLowerCase().includes(search.toLowerCase()) ||
      c.cca3.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === '' || c.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* Search */}
      <input
        className="input input-bordered input-xs w-full"
        placeholder="Search country, CCA2, CCA3…"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />

      {/* Region filter */}
      <div className="flex flex-wrap gap-1">
        <button
          className={`btn btn-xs ${region === '' ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}
          onClick={() => setRegion('')}>
          All
        </button>
        {REGIONS.map((r) => (
          <button
            key={r}
            className={`btn btn-xs ${region === r ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}
            onClick={() => setRegion((prev) => (prev === r ? '' : r))}>
            {r}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
        {filtered.length} countr{filtered.length === 1 ? 'y' : 'ies'}
      </p>

      {/* List */}
      <div className="divide-base-300 flex flex-col divide-y">
        {filtered.map((c) => (
          <div key={c.cca3} className="flex items-center gap-2 py-2">
            {/* Rank badge */}
            <span className="text-base-content/30 w-7 shrink-0 text-right font-mono text-[10px]">
              #{c.rank}
            </span>
            {/* Flag */}
            <span className="text-lg leading-none">{c.flag}</span>
            {/* Name + meta */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{c.name}</p>
              <p className="text-base-content/40 text-[10px]">
                {c.cca2} · {c.subregion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-base-content/25 py-6 text-center text-xs">
          No countries match.
        </p>
      )}
    </div>
  );
};
