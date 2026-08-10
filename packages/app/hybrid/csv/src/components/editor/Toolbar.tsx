'use client';

import { FC, useRef } from 'react';
import {
  FiArrowDown,
  FiArrowLeft,
  FiArrowRight,
  FiArrowUp,
  FiDownload,
  FiFilePlus,
  FiFilter,
  FiHelpCircle,
  FiMessageSquare,
  FiMoon,
  FiPlus,
  FiPrinter,
  FiSearch,
  FiSun,
  FiTrash2,
  FiUpload,
} from 'react-icons/fi';
import type { ExportFormat, FreezeMode } from '@/lib/types';

interface ToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onNew: () => void;
  onImport: (text: string) => void;
  onExport: (format: ExportFormat) => void;
  onPrint: () => void;
  onAddRow: () => void;
  onAddColumn: () => void;
  onDeleteRow: () => void;
  onDeleteColumn: () => void;
  onSort: (direction: 'asc' | 'desc') => void;
  onToggleFilter: () => void;
  filterActive: boolean;
  onToggleFind: () => void;
  findOpen: boolean;
  onToggleComment: () => void;
  canComment: boolean;
  freezeMode: FreezeMode;
  onSetFreeze: (mode: FreezeMode) => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenShortcuts: () => void;
  activeCellLabel: string;
}

const buttonClass = 'btn btn-ghost btn-sm gap-1 font-normal';

const Toolbar: FC<ToolbarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onNew,
  onImport,
  onExport,
  onPrint,
  onAddRow,
  onAddColumn,
  onDeleteRow,
  onDeleteColumn,
  onSort,
  onToggleFilter,
  filterActive,
  onToggleFind,
  findOpen,
  onToggleComment,
  canComment,
  freezeMode,
  onSetFreeze,
  theme,
  onToggleTheme,
  onOpenShortcuts,
  activeCellLabel,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const exportSelect = useRef<HTMLSelectElement>(null);

  const handleFile = async (file: File | undefined): Promise<void> => {
    if (!file) return;
    onImport(await file.text());
  };

  return (
    <div className="no-print flex flex-wrap items-center gap-1 border-b border-base-300 bg-base-200 px-2 py-1.5">
      <button className={buttonClass} onClick={onUndo} disabled={!canUndo}>
        <FiArrowLeft /> Undo
      </button>
      <button className={buttonClass} onClick={onRedo} disabled={!canRedo}>
        <FiArrowRight /> Redo
      </button>
      <span className="bg-base-300 mx-1 h-6 w-px" />
      <button className={buttonClass} onClick={onNew}>
        <FiFilePlus /> New
      </button>
      <button
        className={buttonClass}
        onClick={() => fileInput.current?.click()}>
        <FiUpload /> Import
      </button>
      <input
        ref={fileInput}
        aria-label="Import CSV file"
        accept=".csv,.tsv,text/csv,text/tab-separated-values"
        className="hidden"
        type="file"
        onChange={(event) => {
          void handleFile(event.target.files?.[0]);
          event.target.value = '';
        }}
      />
      <select
        ref={exportSelect}
        aria-label="Export as"
        className="select select-ghost select-sm w-24 font-normal"
        onChange={(event) => {
          const format = event.target.value as ExportFormat;
          if (!format) return;
          onExport(format);
          if (exportSelect.current) exportSelect.current.value = '';
        }}>
        <option value="">Export</option>
        {(['csv', 'tsv', 'json', 'html', 'xml', 'xlsx'] as ExportFormat[]).map(
          (format) => (
            <option key={format} value={format}>
              .{format}
            </option>
          )
        )}
      </select>
      <button className={buttonClass} onClick={onPrint}>
        <FiPrinter /> Print
      </button>
      <span className="bg-base-300 mx-1 h-6 w-px" />
      <button className={buttonClass} onClick={onAddRow}>
        <FiPlus /> Add row
      </button>
      <button className={buttonClass} onClick={onAddColumn}>
        <FiPlus /> Add column
      </button>
      <button className={buttonClass} onClick={onDeleteRow}>
        <FiTrash2 /> Delete row
      </button>
      <button className={buttonClass} onClick={onDeleteColumn}>
        <FiTrash2 /> Delete column
      </button>
      <span className="bg-base-300 mx-1 h-6 w-px" />
      <button
        className={buttonClass}
        onClick={() => onSort('asc')}
        title={`Sort column ${activeCellLabel} A to Z`}>
        <FiArrowDown /> A→Z
      </button>
      <button
        className={buttonClass}
        onClick={() => onSort('desc')}
        title={`Sort column ${activeCellLabel} Z to A`}>
        <FiArrowUp /> Z→A
      </button>
      <button
        className={`${buttonClass} ${filterActive ? 'btn-active' : ''}`}
        onClick={onToggleFilter}>
        <FiFilter /> Filter
      </button>
      <button
        className={`${buttonClass} ${findOpen ? 'btn-active' : ''}`}
        onClick={onToggleFind}>
        <FiSearch /> Find
      </button>
      <button
        className={buttonClass}
        disabled={!canComment}
        onClick={onToggleComment}>
        <FiMessageSquare /> Comment
      </button>
      <select
        aria-label="Freeze panes"
        className="select select-ghost select-sm w-24 font-normal"
        value={freezeMode}
        onChange={(event) => onSetFreeze(event.target.value as FreezeMode)}>
        <option value="none">Freeze: none</option>
        <option value="row">Freeze top row</option>
        <option value="col">Freeze first col</option>
        <option value="both">Freeze both</option>
      </select>
      <span className="bg-base-300 mx-1 h-6 w-px" />
      <button
        className={buttonClass}
        onClick={onToggleTheme}
        title="Toggle theme"
        aria-label="Toggle theme">
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </button>
      <button
        className={buttonClass}
        onClick={onOpenShortcuts}
        aria-label="Keyboard shortcuts">
        <FiHelpCircle />
      </button>
    </div>
  );
};

export default Toolbar;
