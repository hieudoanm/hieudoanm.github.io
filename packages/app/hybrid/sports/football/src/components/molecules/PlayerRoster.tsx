'use client';

import { ExampleSquadMeta } from '@/lib/examples';
import {
  dummyPlayers,
  filterPlayers,
  RosterSortKey,
  sortPlayers,
} from '@/lib/roster';
import { findDuplicateNumbers } from '@/lib/squad';
import {
  CaptainRole,
  ExampleStatus,
  Player,
  PlayerRole,
} from '@/types/football';
import { FC, FormEvent, Fragment, useState } from 'react';
import { FiAlertTriangle, FiEdit2, FiPlus, FiTrash2 } from 'react-icons/fi';

const ROLES: PlayerRole[] = ['GK', 'DEF', 'MID', 'FWD'];

interface PlayerRosterProps {
  players: Player[];
  maxPlayers?: number;
  onAdd: (
    name: string,
    number: number,
    role: PlayerRole,
    position?: string
  ) => void;
  onUpdate: (playerId: string, patch: Partial<Player>) => void;
  onRemove: (playerId: string) => void;
  onToggleBench?: (playerId: string) => void;
  onToggleLeadership?: (playerId: string, role: CaptainRole) => void;
  positionOptions?: string[];
  examples?: ExampleSquadMeta[];
  exampleId?: string;
  onSelectExample?: (exampleId: string) => void;
  onLoadExample?: () => void;
  exampleStatus?: ExampleStatus;
}

export const PlayerRoster: FC<PlayerRosterProps> = ({
  players,
  maxPlayers,
  onAdd,
  onUpdate,
  onRemove,
  onToggleBench,
  onToggleLeadership,
  positionOptions = [],
  examples = [],
  exampleId = '',
  onSelectExample,
  onLoadExample,
  exampleStatus = 'idle',
}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [role, setRole] = useState<PlayerRole>('MID');
  const [position, setPosition] = useState('');
  const [addError, setAddError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editNumber, setEditNumber] = useState('');
  const [editRole, setEditRole] = useState<PlayerRole>('MID');
  const [editPosition, setEditPosition] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editError, setEditError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<RosterSortKey>('name');
  const [roleFilter, setRoleFilter] = useState<PlayerRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'starter' | 'bench'>(
    'all'
  );

  const duplicateNumbers = new Set(findDuplicateNumbers(players));
  const duplicateText =
    duplicateNumbers.size > 0
      ? [...duplicateNumbers].sort((a, b) => a - b).join(', ')
      : null;
  const roleCounts = ROLES.map((role) => ({
    role,
    count: players.filter((player) => player.role === role).length,
  }));
  const starterCount = players.filter((player) => player.bench !== true).length;
  const benchCount = players.length - starterCount;
  const hasActiveFilters =
    roleFilter !== 'all' || statusFilter !== 'all' || query.trim() !== '';
  const visiblePlayers = sortPlayers(
    filterPlayers(players, query).filter(
      (player) =>
        (roleFilter === 'all' || player.role === roleFilter) &&
        (statusFilter === 'all' ||
          (statusFilter === 'bench'
            ? player.bench === true
            : player.bench !== true))
    ),
    sortKey
  );
  const fillCount =
    maxPlayers !== undefined ? Math.max(0, maxPlayers - players.length) : 0;
  const fillerPlayers = dummyPlayers(fillCount);
  const showFillerPlayers =
    query.trim() === '' && roleFilter === 'all' && statusFilter === 'all';
  const sections = ROLES.map((role) => ({
    role,
    players: visiblePlayers.filter((player) => player.role === role),
  })).filter((section) => section.players.length > 0);

  const submit = (event: FormEvent): void => {
    event.preventDefault();
    const shirt = Number.parseInt(number, 10);
    if (name.trim() === '' || Number.isNaN(shirt) || shirt <= 0) return;
    if (maxPlayers !== undefined && players.length >= maxPlayers) {
      setAddError(`Squad is full (max ${maxPlayers} players).`);
      return;
    }
    const existing = players.find((player) => player.number === shirt);
    if (existing) {
      setAddError(`Shirt number ${shirt} is already used by ${existing.name}.`);
      return;
    }
    onAdd(name.trim(), shirt, role, position === '' ? undefined : position);
    setName('');
    setNumber('');
    setRole('MID');
    setPosition('');
    setAddError(null);
  };

  const startEdit = (player: Player): void => {
    setEditingId(player.id);
    setEditName(player.name);
    setEditNumber(String(player.number));
    setEditRole(player.role);
    setEditPosition(player.position ?? '');
    setEditNotes(player.notes ?? '');
    setEditError(null);
  };

  const cancelEdit = (): void => {
    setEditingId(null);
    setEditError(null);
  };

  const submitEdit = (event: FormEvent): void => {
    event.preventDefault();
    if (editingId === null) return;
    const shirt = Number.parseInt(editNumber, 10);
    if (editName.trim() === '' || Number.isNaN(shirt) || shirt <= 0) return;
    const existing = players.find(
      (player) => player.number === shirt && player.id !== editingId
    );
    if (existing) {
      setEditError(
        `Shirt number ${shirt} is already used by ${existing.name}.`
      );
      return;
    }
    onUpdate(editingId, {
      name: editName.trim(),
      number: shirt,
      role: editRole,
      position: editPosition === '' ? undefined : editPosition,
      notes: editNotes.trim() === '' ? undefined : editNotes.trim(),
    });
    setEditingId(null);
    setEditError(null);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-base-content/50 text-xs font-bold uppercase">
          Squad · {players.length}
          {maxPlayers !== undefined ? ` / ${maxPlayers}` : ''}
        </span>
        {onLoadExample && examples.length > 0 && (
          <div className="flex min-w-0 gap-1">
            <select
              aria-label="Example squad to load"
              value={exampleId}
              onChange={(e) => onSelectExample?.(e.target.value)}
              className="select select-bordered select-xs min-w-0 flex-1">
              {examples.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              aria-label="Load example squad"
              onClick={onLoadExample}
              disabled={exampleStatus === 'loading'}
              className="btn btn-outline btn-xs">
              {exampleStatus === 'loading' ? 'Loading…' : 'Load'}
            </button>
          </div>
        )}
      </div>
      {exampleStatus === 'error' && (
        <p className="text-error text-xs">Could not load the example squad.</p>
      )}

      <form onSubmit={submit} className="flex flex-col gap-1">
        <div className="flex gap-1">
          <input
            aria-label="Player name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="input input-bordered input-sm min-w-0 flex-1"
          />
          <input
            aria-label="Shirt number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="#"
            className="input input-bordered input-sm w-14"
          />
          <select
            aria-label="Player role"
            value={role}
            onChange={(e) => setRole(e.target.value as PlayerRole)}
            className="select select-bordered select-sm min-w-0 flex-1">
            {ROLES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button
            type="submit"
            aria-label="Add player"
            className="btn btn-primary btn-sm">
            <FiPlus className="size-4" />
            Add
          </button>
        </div>
        {positionOptions.length > 0 && (
          <select
            aria-label="Preferred position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="select select-bordered select-sm">
            <option value="">Preferred position (optional)</option>
            {positionOptions.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        )}
      </form>
      {addError && (
        <p className="text-warning flex items-center gap-1 text-xs">
          <FiAlertTriangle className="size-3" />
          {addError}
        </p>
      )}
      {duplicateText && (
        <p className="text-warning flex items-center gap-1 text-xs">
          <FiAlertTriangle className="size-3" />
          Duplicate shirt numbers: {duplicateText}
        </p>
      )}

      {players.length === 0 && maxPlayers === undefined ? (
        <p className="text-base-content/40 text-xs">No players yet.</p>
      ) : (
        <>
          <div className="flex gap-1">
            <input
              aria-label="Search players"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search players…"
              className="input input-bordered input-xs min-w-0 flex-1"
            />
            <select
              aria-label="Sort players"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as RosterSortKey)}
              className="select select-bordered select-xs">
              <option value="name">Name</option>
              <option value="number">Number</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <div
              role="group"
              aria-label="Filter by role"
              className="flex flex-wrap gap-1">
              <button
                type="button"
                aria-label="Show all roles"
                onClick={() => setRoleFilter('all')}
                className={`btn btn-xs ${
                  roleFilter === 'all' ? 'btn-primary' : 'btn-ghost'
                }`}>
                All {players.length}
              </button>
              {roleCounts.map(({ role, count }) => (
                <button
                  key={role}
                  type="button"
                  aria-label={`Filter by ${role}`}
                  onClick={() =>
                    setRoleFilter(roleFilter === role ? 'all' : role)
                  }
                  className={`btn btn-xs ${
                    roleFilter === role ? 'btn-primary' : 'btn-ghost'
                  }`}>
                  {role} {count}
                </button>
              ))}
            </div>
            <div
              role="group"
              aria-label="Filter by status"
              className="flex flex-wrap gap-1">
              <button
                type="button"
                aria-label="Show all players"
                onClick={() => setStatusFilter('all')}
                className={`btn btn-xs ${
                  statusFilter === 'all' ? 'btn-primary' : 'btn-ghost'
                }`}>
                All
              </button>
              <button
                type="button"
                aria-label="Show starters only"
                onClick={() =>
                  setStatusFilter(
                    statusFilter === 'starter' ? 'all' : 'starter'
                  )
                }
                className={`btn btn-xs ${
                  statusFilter === 'starter' ? 'btn-primary' : 'btn-ghost'
                }`}>
                Starters {starterCount}
              </button>
              <button
                type="button"
                aria-label="Show bench players only"
                onClick={() =>
                  setStatusFilter(statusFilter === 'bench' ? 'all' : 'bench')
                }
                className={`btn btn-xs ${
                  statusFilter === 'bench' ? 'btn-primary' : 'btn-ghost'
                }`}>
                Bench {benchCount}
              </button>
            </div>
          </div>
          {visiblePlayers.length === 0 && hasActiveFilters ? (
            <p className="text-base-content/40 text-xs">
              {query.trim() !== ''
                ? 'No players match.'
                : 'No players match the filters.'}
            </p>
          ) : (
            <ul className="flex max-h-48 list-none flex-col gap-1 overflow-y-auto">
              {sections.map((section, index) => (
                <Fragment key={section.role}>
                  {index > 0 && (
                    <li
                      aria-hidden={true}
                      className="border-base-300 border-t"
                    />
                  )}
                  <li className="text-base-content/50 flex items-baseline justify-between px-1 text-[10px] font-bold uppercase">
                    {section.role} · {section.players.length}
                  </li>
                  {section.players.map((player) =>
                    editingId === player.id ? (
                      <li
                        key={player.id}
                        className="border-base-300 flex flex-col gap-1 rounded border p-1">
                        <form onSubmit={submitEdit} className="flex gap-1">
                          <input
                            aria-label="Edit player name"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="input input-bordered input-xs min-w-0 flex-1"
                          />
                          <input
                            aria-label="Edit shirt number"
                            value={editNumber}
                            onChange={(e) => setEditNumber(e.target.value)}
                            className="input input-bordered input-xs w-14"
                          />
                          <select
                            aria-label="Edit player role"
                            value={editRole}
                            onChange={(e) =>
                              setEditRole(e.target.value as PlayerRole)
                            }
                            className="select select-bordered select-xs min-w-0 flex-1">
                            {ROLES.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            aria-label="Save player"
                            className="btn btn-primary btn-xs">
                            Save
                          </button>
                          <button
                            type="button"
                            aria-label="Cancel edit"
                            onClick={cancelEdit}
                            className="btn btn-ghost btn-xs">
                            Cancel
                          </button>
                        </form>
                        {positionOptions.length > 0 && (
                          <select
                            aria-label="Edit preferred position"
                            value={editPosition}
                            onChange={(e) => setEditPosition(e.target.value)}
                            className="select select-bordered select-xs">
                            <option value="">
                              Preferred position (optional)
                            </option>
                            {positionOptions.map((label) => (
                              <option key={label} value={label}>
                                {label}
                              </option>
                            ))}
                          </select>
                        )}
                        <textarea
                          aria-label="Edit player notes"
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          placeholder="Notes (fitness, availability, comments)"
                          rows={2}
                          className="textarea textarea-bordered textarea-xs"
                        />
                        {editError && (
                          <p className="text-warning flex items-center gap-1 text-xs">
                            <FiAlertTriangle className="size-3" />
                            {editError}
                          </p>
                        )}
                      </li>
                    ) : (
                      <li
                        key={player.id}
                        className="border-base-300 flex items-center gap-2 rounded border p-1">
                        <span className="text-base-content/50 w-6 text-center text-[10px]">
                          {player.number}
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="truncate text-xs">
                            {player.name}
                          </span>
                          {player.notes && (
                            <span className="text-base-content/40 truncate text-[10px]">
                              {player.notes}
                            </span>
                          )}
                        </span>
                        <span className="badge badge-outline badge-xs">
                          {player.role}
                        </span>
                        {player.bench === true && (
                          <span className="badge badge-neutral badge-xs">
                            Bench
                          </span>
                        )}
                        {player.captain === true && (
                          <span className="badge badge-primary badge-xs">
                            C
                          </span>
                        )}
                        {player.viceCaptain === true && (
                          <span className="badge badge-secondary badge-xs">
                            VC
                          </span>
                        )}
                        {duplicateNumbers.has(player.number) && (
                          <span
                            aria-label={`Duplicate number for ${player.name}`}
                            className="text-warning">
                            <FiAlertTriangle className="size-3" />
                          </span>
                        )}
                        {onToggleLeadership && (
                          <button
                            type="button"
                            aria-label={`${player.captain === true ? 'Clear' : 'Make'} ${player.name} captain`}
                            onClick={() =>
                              onToggleLeadership(player.id, 'captain')
                            }
                            className="btn btn-ghost btn-xs">
                            {player.captain === true ? 'C×' : 'C'}
                          </button>
                        )}
                        {onToggleLeadership && (
                          <button
                            type="button"
                            aria-label={`${player.viceCaptain === true ? 'Clear' : 'Make'} ${player.name} vice-captain`}
                            onClick={() =>
                              onToggleLeadership(player.id, 'vice')
                            }
                            className="btn btn-ghost btn-xs">
                            {player.viceCaptain === true ? 'VC×' : 'VC'}
                          </button>
                        )}
                        {onToggleBench && (
                          <button
                            type="button"
                            aria-label={`${
                              player.bench === true ? 'Promote' : 'Bench'
                            } ${player.name}`}
                            onClick={() => onToggleBench(player.id)}
                            className="btn btn-ghost btn-xs">
                            {player.bench === true ? 'Pitch' : 'Bench'}
                          </button>
                        )}
                        <button
                          type="button"
                          aria-label={`Edit ${player.name}`}
                          onClick={() => startEdit(player)}
                          className="btn btn-ghost btn-xs">
                          <FiEdit2 className="size-3" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Remove ${player.name}`}
                          onClick={() => onRemove(player.id)}
                          className="btn btn-ghost btn-xs">
                          <FiTrash2 className="size-3" />
                        </button>
                      </li>
                    )
                  )}
                </Fragment>
              ))}
              {showFillerPlayers && fillerPlayers.length > 0 && (
                <Fragment>
                  {sections.length > 0 && (
                    <li
                      aria-hidden={true}
                      className="border-base-300 border-t"
                    />
                  )}
                  {fillerPlayers.map((player) => (
                    <li
                      key={player.id}
                      className="border-base-300/50 flex items-center gap-2 rounded border border-dashed p-1">
                      <span className="text-base-content/30 w-6 text-center text-[10px]">
                        {player.number}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-base-content/40 truncate text-xs italic">
                          {player.name}
                        </span>
                      </span>
                      <span className="badge badge-ghost badge-xs">
                        {player.role}
                      </span>
                      <span className="badge badge-outline badge-xs">
                        Empty
                      </span>
                    </li>
                  ))}
                </Fragment>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

PlayerRoster.displayName = 'PlayerRoster';
