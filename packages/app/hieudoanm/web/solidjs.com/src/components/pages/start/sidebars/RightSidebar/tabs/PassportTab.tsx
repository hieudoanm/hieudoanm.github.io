import { countries } from '@hieudoanm.github.io/data/countries';
import { createSignal } from 'solid-js';

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

export const PassportTab = () => {
  const [search, setSearch] = createSignal('');
  const [region, setRegion] = createSignal('');

  const s = search();
  const r = region();

  const filtered = ranked.filter((c) => {
    const matchesSearch =
      s === '' ||
      c.name.toLowerCase().includes(s.toLowerCase()) ||
      c.cca2.toLowerCase().includes(s.toLowerCase()) ||
      c.cca3.toLowerCase().includes(s.toLowerCase());
    const matchesRegion = r === '' || c.region === r;
    return matchesSearch && matchesRegion;
  });

  return (
    <div class="flex flex-col gap-3 p-3">
      <input
        class="input input-bordered input-xs w-full"
        placeholder="Search country, CCA2, CCA3…"
        value={s}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      <div class="flex flex-wrap gap-1">
        <button
          class={`btn btn-xs ${r === '' ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}
          onClick={() => setRegion('')}>
          All
        </button>
        {REGIONS.map((regionName) => (
          <button
            class={`btn btn-xs ${r === regionName ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}
            onClick={() =>
              setRegion((prev) => (prev === regionName ? '' : regionName))
            }>
            {regionName}
          </button>
        ))}
      </div>

      <p class="text-base-content/40 text-[10px] font-bold tracking-widest uppercase">
        {filtered.length} countr{filtered.length === 1 ? 'y' : 'ies'}
      </p>

      <div class="divide-base-300 flex flex-col divide-y">
        {filtered.map((c) => (
          <div class="flex items-center gap-2 py-2">
            <span class="text-base-content/30 w-7 shrink-0 text-right font-mono text-[10px]">
              #{c.rank}
            </span>
            <span class="text-lg leading-none">{c.flag}</span>
            <div class="min-w-0 flex-1">
              <p class="truncate text-xs font-medium">{c.name}</p>
              <p class="text-base-content/40 text-[10px]">
                {c.cca2} · {c.subregion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p class="text-base-content/25 py-6 text-center text-xs">
          No countries match.
        </p>
      )}
    </div>
  );
};
