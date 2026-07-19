'use client';

import { FC, memo } from 'react';
import { FONTS } from '../fonts';
import { ViewMode } from '../types';

interface ViewControlsProps {
  viewMode: ViewMode;
  showToc: boolean;
  showLineNumbers: boolean;
  restored: boolean;
  fontId: string;
  onViewModeChange: (mode: ViewMode) => void;
  onTocToggle: () => void;
  onLineNumbersToggle: () => void;
  onFontChange: (fontId: string) => void;
}

const VIEW_MODES: { id: ViewMode; label: string }[] = [
  { id: 'split', label: 'Split' },
  { id: 'editor', label: 'Editor' },
  { id: 'preview', label: 'Preview' },
];

export const ViewControls: FC<ViewControlsProps> = memo(
  ({
    viewMode,
    showToc,
    showLineNumbers,
    restored,
    fontId,
    onViewModeChange,
    onTocToggle,
    onLineNumbersToggle,
    onFontChange,
  }) => (
    <div className="border-base-300 flex items-center justify-between border-b px-3 py-1.5">
      <div className="flex items-center gap-1">
        {VIEW_MODES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`btn btn-xs ${viewMode === id ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => onViewModeChange(id)}>
            {label}
          </button>
        ))}
        <div className="border-base-300 mx-0.5 h-4 w-px border-l" />
        <button
          type="button"
          className={`btn btn-xs ${showToc ? 'btn-primary' : 'btn-ghost'}`}
          onClick={onTocToggle}
          title="Toggle table of contents">
          ToC
        </button>
        <button
          type="button"
          className={`btn btn-xs ${showLineNumbers ? 'btn-primary' : 'btn-ghost'}`}
          onClick={onLineNumbersToggle}
          title="Toggle line numbers">
          #Line
        </button>
        {restored && (
          <span className="badge badge-warning badge-xs">Draft restored</span>
        )}
      </div>
      <select
        className="select select-xs border-base-300 w-auto border"
        value={fontId}
        onChange={(e) => onFontChange(e.target.value)}>
        {FONTS.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
);
ViewControls.displayName = 'ViewControls';
