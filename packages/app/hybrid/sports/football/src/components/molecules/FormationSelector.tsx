'use client';

import { formationGroupsFor, formationsFor } from '@/lib/formations';
import { Formation, FormationSize } from '@/types/football';
import { FC } from 'react';

const SIZES: FormationSize[] = [11, 7, 5];

interface FormationSelectorProps {
  formation: Formation;
  onSelectFormation: (formationId: string) => void;
  onSelectSize: (size: FormationSize) => void;
}

export const FormationSelector: FC<FormationSelectorProps> = ({
  formation,
  onSelectFormation,
  onSelectSize,
}) => {
  const options = formationsFor(formation.size);
  const groups = formationGroupsFor(formation.size);

  return (
    <div className="flex flex-col gap-2 print:hidden">
      <div className="flex items-center justify-between">
        <span className="text-base-content/50 text-xs font-bold uppercase">
          Formation
        </span>
        <span className="badge badge-outline badge-sm">
          {formation.size}-a-side · {formation.name}
        </span>
      </div>

      <div role="group" aria-label="Formation size" className="join">
        {SIZES.map((size) => (
          <input
            key={size}
            type="radio"
            name="formation-size"
            value={size}
            aria-label={`${size} players`}
            checked={formation.size === size}
            onChange={() => onSelectSize(size)}
            className={`btn btn-sm join-item ${formation.size === size ? 'btn-active' : ''}`}
          />
        ))}
      </div>

      <select
        aria-label="Formation"
        value={formation.id}
        onChange={(e) => onSelectFormation(e.target.value)}
        className="select select-bordered select-sm w-full">
        {groups.map((group) => (
          <optgroup key={group} label={group}>
            {options
              .filter((option) => option.group === group)
              .map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name} · {option.slots.length} players
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

FormationSelector.displayName = 'FormationSelector';
