import type { FC } from 'react';
import type { Opening } from '@hieudoanm.github.io/data/chess/openings';
import { ecoGroups, ecoSubgroups } from '../utils/eco';

interface EcoPanelProps {
  group: string;
  subgroup: string;
  ecoIndex: number;
  ecoList: Opening[];
  ecoOpening: Opening | undefined;
  onGroupChange: (g: string) => void;
  onSubgroupChange: (s: string) => void;
  onOpeningChange: (i: number) => void;
}

export const EcoPanel: FC<EcoPanelProps> = ({
  group,
  subgroup,
  ecoIndex,
  ecoList,
  ecoOpening,
  onGroupChange,
  onSubgroupChange,
  onOpeningChange,
}) => (
  <div className="flex flex-col gap-3">
    <div>
      <label className="text-base-content/60 mb-1 block text-xs font-semibold tracking-widest uppercase">
        Group
      </label>
      <select
        className="select select-bordered select-sm w-full"
        value={group}
        onChange={(e) => onGroupChange(e.target.value)}>
        {ecoGroups.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="text-base-content/60 mb-1 block text-xs font-semibold tracking-widest uppercase">
        Variation
      </label>
      <select
        className="select select-bordered select-sm w-full"
        value={subgroup}
        onChange={(e) => onSubgroupChange(e.target.value)}>
        {ecoSubgroups(group).map((s) => (
          <option key={s} value={s}>
            {s || '(main line)'}
          </option>
        ))}
      </select>
    </div>
    <div>
      <label className="text-base-content/60 mb-1 block text-xs font-semibold tracking-widest uppercase">
        Line ({ecoList.length})
      </label>
      <div className="flex max-h-48 flex-col gap-0.5 overflow-y-auto">
        {ecoList.map((o, i) => (
          <button
            key={`${o.eco}-${i}`}
            onClick={() => onOpeningChange(i)}
            className={`flex w-full items-start gap-2 rounded px-2 py-1.5 text-left transition-colors ${
              i === ecoIndex
                ? 'bg-primary/10 text-primary'
                : 'hover:bg-base-content/5'
            }`}>
            <span className="bg-base-300 mt-0.5 shrink-0 rounded px-1 font-mono text-[10px]">
              {o.eco}
            </span>
            <span className="truncate text-xs">{o.name}</span>
          </button>
        ))}
      </div>
    </div>
    {ecoOpening && (
      <div className="bg-base-100 rounded-lg p-3">
        <p className="text-primary font-mono text-[10px] leading-relaxed">
          {ecoOpening.pgn}
        </p>
      </div>
    )}
  </div>
);
