'use client';

import { type FC, useState } from 'react';
import { FiBookmark, FiX } from 'react-icons/fi';
import type { Label, Member } from '@/types';

export type DueFilter = 'all' | 'overdue' | 'today' | 'week' | 'none';
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high' | 'urgent';

export interface BoardFilters {
  activeLabel: string | null;
  activeMember: string | null;
  dueFilter: DueFilter;
  priorityFilter: PriorityFilter;
}

interface Preset extends BoardFilters {
  id: string;
  name: string;
}

interface BoardFilterBarProps {
  boardId: string;
  labels: Label[];
  members: Member[];
  filters: BoardFilters;
  onChange: (filters: BoardFilters) => void;
}

const DUE_OPTIONS: { value: DueFilter; label: string }[] = [
  { value: 'all', label: 'Any due date' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'today', label: 'Due today' },
  { value: 'week', label: 'Next 7 days' },
  { value: 'none', label: 'No due date' },
];

const PRIORITY_OPTIONS: { value: PriorityFilter; label: string }[] = [
  { value: 'all', label: 'Any priority' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const presetKey = (boardId: string) => `board-filters:${boardId}`;

const loadPresets = (boardId: string): Preset[] => {
  try {
    const raw = localStorage.getItem(presetKey(boardId));
    return raw ? (JSON.parse(raw) as Preset[]) : [];
  } catch {
    return [];
  }
};

const savePresets = (boardId: string, presets: Preset[]) => {
  try {
    localStorage.setItem(presetKey(boardId), JSON.stringify(presets));
  } catch {
    // ignore storage errors
  }
};

const BoardFilterBar: FC<BoardFilterBarProps> = ({
  boardId,
  labels,
  members,
  filters,
  onChange,
}) => {
  const [presets, setPresets] = useState<Preset[]>(() => loadPresets(boardId));
  const [showPresets, setShowPresets] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [presetName, setPresetName] = useState('');

  const hasFilters =
    filters.activeLabel != null ||
    filters.activeMember != null ||
    filters.dueFilter !== 'all' ||
    filters.priorityFilter !== 'all';

  const clearAll = () =>
    onChange({
      activeLabel: null,
      activeMember: null,
      dueFilter: 'all',
      priorityFilter: 'all',
    });

  const handleSave = () => {
    const name = presetName.trim();
    if (!name) return;
    const preset: Preset = {
      id: String(Date.now()),
      name,
      activeLabel: filters.activeLabel,
      activeMember: filters.activeMember,
      dueFilter: filters.dueFilter,
      priorityFilter: filters.priorityFilter,
    };
    const next = [...presets, preset];
    setPresets(next);
    savePresets(boardId, next);
    setPresetName('');
    setShowSave(false);
  };

  const handleApply = (preset: Preset) => {
    onChange({
      activeLabel: preset.activeLabel,
      activeMember: preset.activeMember,
      dueFilter: preset.dueFilter,
      priorityFilter: preset.priorityFilter,
    });
    setShowPresets(false);
  };

  const handleDelete = (id: string) => {
    const next = presets.filter((p) => p.id !== id);
    setPresets(next);
    savePresets(boardId, next);
  };

  return (
    <div className="border-base-300 bg-base-100 flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-2">
      {labels.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase opacity-50">
            Labels
          </span>
          {labels.map((lbl) => (
            <button
              key={lbl.id}
              type="button"
              aria-pressed={filters.activeLabel === lbl.id}
              onClick={() =>
                onChange({
                  ...filters,
                  activeLabel: filters.activeLabel === lbl.id ? null : lbl.id,
                })
              }
              className={`badge badge-sm cursor-pointer ${
                filters.activeLabel === lbl.id ? '' : 'opacity-30'
              }`}
              style={{ backgroundColor: lbl.color, color: 'white' }}>
              {lbl.name}
            </button>
          ))}
        </div>
      )}

      {members.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase opacity-50">
            Members
          </span>
          {members.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={filters.activeMember === m.id}
              title={m.name}
              onClick={() =>
                onChange({
                  ...filters,
                  activeMember: filters.activeMember === m.id ? null : m.id,
                })
              }
              className={`bg-base-300 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                filters.activeMember === m.id
                  ? 'ring-primary ring-2'
                  : 'opacity-40'
              }`}>
              {m.avatar}
            </button>
          ))}
        </div>
      )}

      <select
        aria-label="Due date filter"
        value={filters.dueFilter}
        onChange={(e) =>
          onChange({ ...filters, dueFilter: e.target.value as DueFilter })
        }
        className="select select-bordered select-xs">
        {DUE_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <select
        aria-label="Priority filter"
        value={filters.priorityFilter}
        onChange={(e) =>
          onChange({
            ...filters,
            priorityFilter: e.target.value as PriorityFilter,
          })
        }
        className="select select-bordered select-xs">
        {PRIORITY_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="btn btn-ghost btn-xs">
          <FiX className="size-3" /> Clear filters
        </button>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowPresets((p) => !p)}
          className="btn btn-ghost btn-xs">
          <FiBookmark className="size-3" /> Presets
        </button>
        {showPresets && (
          <div className="bg-base-100 absolute top-8 left-0 z-30 w-60 rounded-lg border p-2 shadow-lg">
            {presets.length === 0 && (
              <p className="px-2 py-1 text-xs opacity-50">No saved presets</p>
            )}
            {presets.map((p) => (
              <div key={p.id} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleApply(p)}
                  className="btn btn-ghost btn-xs flex-1 justify-start">
                  {p.name}
                </button>
                <button
                  type="button"
                  aria-label={`Delete preset ${p.name}`}
                  onClick={() => handleDelete(p.id)}
                  className="btn btn-ghost btn-xs">
                  <FiX className="size-3" />
                </button>
              </div>
            ))}
            {!showSave && (
              <button
                type="button"
                onClick={() => setShowSave(true)}
                className="btn btn-ghost btn-xs mt-1 w-full justify-start">
                Save current filters…
              </button>
            )}
            {showSave && (
              <div className="mt-1 flex gap-1">
                <input
                  aria-label="Preset name"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder="Preset name"
                  className="input input-bordered input-xs w-full"
                />
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn btn-primary btn-xs">
                  Save
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardFilterBar;
