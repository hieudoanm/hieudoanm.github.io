import { FC } from 'react';

export interface Country {
  name: string;
  official_name: string;
  region: string;
  subregion: string;
  cca2: string;
  cca3: string;
  flag: string;
  rank: number;
}

export const CountryRow: FC<{ country: Country }> = ({ country: c }) => (
  <div className="flex items-center gap-2 py-2">
    <span className="text-base-content/30 w-7 shrink-0 text-right font-mono text-[10px]">
      #{c.rank}
    </span>
    <span className="text-lg leading-none">{c.flag}</span>
    <div className="min-w-0 flex-1">
      <p className="truncate text-xs font-normal">{c.name}</p>
      <p className="text-base-content/40 text-[10px]">
        {c.cca2} · {c.subregion}
      </p>
    </div>
  </div>
);
CountryRow.displayName = 'CountryRow';
