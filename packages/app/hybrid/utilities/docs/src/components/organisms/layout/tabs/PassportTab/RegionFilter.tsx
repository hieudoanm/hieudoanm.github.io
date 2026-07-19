import { FC } from 'react';

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;

export const RegionFilter: FC<{
  region: string;
  onChange: (v: string) => void;
}> = ({ region, onChange }) => (
  <div className="flex flex-wrap gap-1">
    <button
      className={`btn btn-xs ${region === '' ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}
      onClick={() => onChange('')}>
      All
    </button>
    {REGIONS.map((r) => (
      <button
        key={r}
        className={`btn btn-xs ${region === r ? 'btn-primary' : 'btn-ghost border-base-300 border'}`}
        onClick={() => onChange(region === r ? '' : r)}>
        {r}
      </button>
    ))}
  </div>
);
RegionFilter.displayName = 'RegionFilter';
