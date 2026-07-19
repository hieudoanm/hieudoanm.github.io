import { countries } from '@hieudoanm.github.io/data/countries';
import { FC, useMemo, useState } from 'react';

import { Country, CountryRow } from './CountryRow';
import { RegionFilter } from './RegionFilter';
import { SearchInput } from './SearchInput';

export const PassportTab: FC = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  const ranked = useMemo(
    () =>
      (countries as Country[])
        .filter((c) => c.rank > 0)
        .sort((a, b) => a.rank - b.rank),
    []
  );

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
      <SearchInput value={search} onChange={setSearch} />

      <RegionFilter region={region} onChange={setRegion} />

      <p className="text-base-content/40 text-[10px] font-normal tracking-widest uppercase">
        {filtered.length} countr{filtered.length === 1 ? 'y' : 'ies'}
      </p>

      <div className="divide-base-300 flex flex-col divide-y">
        {filtered.map((c) => (
          <CountryRow key={c.cca3} country={c} />
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
PassportTab.displayName = 'PassportTab';
