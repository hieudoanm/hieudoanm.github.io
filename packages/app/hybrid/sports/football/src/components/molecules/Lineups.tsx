'use client';

import { findFormation } from '@/lib/formations';
import { Squad } from '@/types/football';
import { FC, useState } from 'react';
import { FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface LineupsProps {
  squad: Squad;
  onSave: (name: string) => void;
  onApply: (lineupId: string) => void;
  onRename: (lineupId: string, name: string) => void;
  onRemove: (lineupId: string) => void;
}

export const Lineups: FC<LineupsProps> = ({
  squad,
  onSave,
  onApply,
  onRename,
  onRemove,
}) => {
  const [name, setName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const startRename = (lineupId: string, current: string): void => {
    setRenamingId(lineupId);
    setRenameValue(current);
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base-content/50 text-xs font-bold uppercase">
        Saved lineups
      </span>

      <div className="flex items-center gap-1">
        <input
          aria-label="Lineup name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Plan A"
          className="input input-bordered input-sm w-full"
        />
        <button
          type="button"
          aria-label="Save lineup"
          onClick={() => {
            onSave(name);
            setName('');
          }}
          className="btn btn-sm btn-primary">
          <FiCheck className="size-4" />
          Save
        </button>
      </div>

      {squad.lineups.length === 0 ? (
        <p className="text-base-content/40 text-[10px]">
          No lineups saved yet — snapshot the current eleven as Plan A or Plan
          B.
        </p>
      ) : (
        <ul className="flex list-none flex-col gap-1">
          {squad.lineups.map((lineup) => {
            const target = findFormation(lineup.formationId);
            const editing = renamingId === lineup.id;
            return (
              <li
                key={lineup.id}
                className="border-base-300 flex items-center gap-2 rounded border p-1">
                {editing ? (
                  <input
                    aria-label={`Rename lineup ${lineup.name}`}
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    className="input input-bordered input-xs min-w-0 flex-1"
                  />
                ) : (
                  <button
                    type="button"
                    aria-label={`Apply lineup ${lineup.name}`}
                    onClick={() => onApply(lineup.id)}
                    className="min-w-0 flex-1 text-left text-xs font-bold hover:underline">
                    <span className="truncate">{lineup.name}</span>
                    <span className="text-base-content/50 block truncate text-[10px] font-normal">
                      {target?.name ?? lineup.formationId} ·{' '}
                      {Object.keys(lineup.assignments).length} slots
                    </span>
                  </button>
                )}
                {editing ? (
                  <button
                    type="button"
                    aria-label="Save lineup name"
                    onClick={() => {
                      onRename(lineup.id, renameValue);
                      setRenamingId(null);
                    }}
                    className="btn btn-ghost btn-xs">
                    <FiCheck className="size-3" />
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label={`Rename lineup ${lineup.name}`}
                    onClick={() => startRename(lineup.id, lineup.name)}
                    className="btn btn-ghost btn-xs text-base-content/50">
                    <FiEdit2 className="size-3" />
                  </button>
                )}
                <button
                  type="button"
                  aria-label={`Remove lineup ${lineup.name}`}
                  onClick={() => onRemove(lineup.id)}
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

Lineups.displayName = 'Lineups';
