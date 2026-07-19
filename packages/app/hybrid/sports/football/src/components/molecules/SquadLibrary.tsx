'use client';

import { SquadLibrary as SquadLibraryType } from '@/types/football';
import { FC, FormEvent, useState } from 'react';
import { FiCopy, FiPlus, FiTrash2 } from 'react-icons/fi';

interface SquadLibraryProps {
  library: SquadLibraryType;
  activeSquadName: string;
  onSelect: (id: string) => void;
  onAdd: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
}

export const SquadLibrary: FC<SquadLibraryProps> = ({
  library,
  activeSquadName,
  onSelect,
  onAdd,
  onRename,
  onDuplicate,
  onRemove,
}) => {
  const [newName, setNewName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');

  const submitNew = (event: FormEvent): void => {
    event.preventDefault();
    if (newName.trim() === '') return;
    onAdd(newName.trim());
    setNewName('');
  };

  const submitRename = (event: FormEvent): void => {
    event.preventDefault();
    if (renamingId === null) return;
    onRename(renamingId, renameValue);
    setRenamingId(null);
    setRenameValue('');
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-base-content/50 text-xs font-bold uppercase">
        Squads · {library.squads.length}
      </span>
      <ul className="flex list-none flex-col gap-1">
        {library.squads.map((squad) => {
          const active = squad.id === library.activeId;
          return (
            <li key={squad.id} className="flex items-center gap-1">
              {renamingId === squad.id ? (
                <form
                  onSubmit={submitRename}
                  className="flex min-w-0 flex-1 gap-1">
                  <input
                    aria-label="Squad name"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    autoFocus
                    className="input input-bordered input-xs min-w-0 flex-1"
                  />
                  <button
                    type="submit"
                    aria-label="Save"
                    className="btn btn-primary btn-xs">
                    Save
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect(squad.id)}
                  className={`btn btn-ghost btn-xs min-w-0 flex-1 justify-start truncate ${active ? 'btn-active' : ''}`}>
                  {squad.name}
                </button>
              )}
              <button
                type="button"
                aria-label={`Rename ${squad.name}`}
                onClick={() => {
                  setRenamingId(squad.id);
                  setRenameValue(squad.name);
                }}
                className="btn btn-ghost btn-xs px-1">
                <span className="text-xs">✎</span>
              </button>
              <button
                type="button"
                aria-label={`Duplicate ${squad.name}`}
                onClick={() => onDuplicate(squad.id)}
                className="btn btn-ghost btn-xs px-1">
                <FiCopy className="size-3" />
              </button>
              <button
                type="button"
                aria-label={`Delete ${squad.name}`}
                onClick={() => onRemove(squad.id)}
                disabled={library.squads.length === 1}
                className="btn btn-ghost btn-xs px-1">
                <FiTrash2 className="size-3" />
              </button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={submitNew} className="flex gap-1">
        <input
          aria-label="New squad name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New squad name"
          className="input input-bordered input-xs min-w-0 flex-1"
        />
        <button
          type="submit"
          aria-label="Add squad"
          className="btn btn-primary btn-xs">
          <FiPlus className="size-3" />
          Add
        </button>
      </form>
      <p className="text-base-content/40 truncate text-xs">
        Active squad: {activeSquadName}
      </p>
    </div>
  );
};

SquadLibrary.displayName = 'SquadLibrary';
