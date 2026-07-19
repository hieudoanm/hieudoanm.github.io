'use client';

import { findFormation } from '@/lib/formations';
import { Squad } from '@/types/football';
import { FC, useState } from 'react';
import { FiCheck, FiTrash2 } from 'react-icons/fi';

interface FormationPresetsProps {
  squad: Squad;
  onSave: (name: string) => void;
  onApply: (formationId: string) => void;
  onRemove: (presetId: string) => void;
}

export const FormationPresets: FC<FormationPresetsProps> = ({
  squad,
  onSave,
  onApply,
  onRemove,
}) => {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base-content/50 text-xs font-bold uppercase">
        Formation presets
      </span>

      <div className="flex items-center gap-1">
        <input
          aria-label="Preset name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Counter-attack"
          className="input input-bordered input-sm w-full"
        />
        <button
          type="button"
          aria-label="Save formation preset"
          onClick={() => {
            onSave(name);
            setName('');
          }}
          className="btn btn-sm btn-primary">
          <FiCheck className="size-4" />
          Save
        </button>
      </div>

      {squad.presets.length === 0 ? (
        <p className="text-base-content/40 text-[10px]">
          No presets saved yet — bookmark a shape to switch back with one tap.
        </p>
      ) : (
        <ul className="flex list-none flex-col gap-1">
          {squad.presets.map((preset) => {
            const target = findFormation(preset.formationId);
            const active = preset.formationId === squad.formationId;
            return (
              <li
                key={preset.id}
                className="border-base-300 flex items-center gap-2 rounded border p-1">
                <button
                  type="button"
                  aria-label={`Apply preset ${preset.name}`}
                  onClick={() => onApply(preset.formationId)}
                  className={`min-w-0 flex-1 text-left text-xs font-bold ${
                    active ? 'text-primary' : 'hover:underline'
                  }`}>
                  <span className="truncate">{preset.name}</span>
                  <span className="text-base-content/50 block truncate text-[10px] font-normal">
                    {target?.name ?? preset.formationId}
                  </span>
                </button>
                {active && (
                  <span className="badge badge-primary badge-sm">active</span>
                )}
                <button
                  type="button"
                  aria-label={`Remove preset ${preset.name}`}
                  onClick={() => onRemove(preset.id)}
                  className="btn btn-ghost btn-xs text-base-content/50">
                  <FiTrash2 className="size-3" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

FormationPresets.displayName = 'FormationPresets';
