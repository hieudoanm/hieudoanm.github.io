'use client';

import { type FC, useState } from 'react';
import { FiBookmark, FiX } from 'react-icons/fi';
import type { BoardFilters, Preset } from '@/types/board-filters';

const STORAGE_PREFIX = 'board-filters:';

const loadPresets = (boardId: string): Preset[] => {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${boardId}`);
    return raw ? (JSON.parse(raw) as Preset[]) : [];
  } catch {
    return [];
  }
};

const savePresets = (boardId: string, presets: Preset[]) => {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${boardId}`,
      JSON.stringify(presets)
    );
  } catch {
    // ignore storage errors
  }
};

interface PresetsMenuProps {
  boardId: string;
  filters: BoardFilters;
  onChange: (filters: BoardFilters) => void;
}

export const PresetsMenu: FC<PresetsMenuProps> = ({
  boardId,
  filters,
  onChange,
}) => {
  const [presets, setPresets] = useState<Preset[]>(() => loadPresets(boardId));
  const [showPresets, setShowPresets] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [presetName, setPresetName] = useState('');

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
  );
};
