'use client';

import { FC } from 'react';
import {
  FiDownload,
  FiFilePlus,
  FiHelpCircle,
  FiImage,
  FiLayout,
  FiMaximize,
  FiMinus,
  FiMoon,
  FiPlus,
  FiSun,
  FiUpload,
} from 'react-icons/fi';
import type { Theme } from '@/hooks/useTheme';

interface ToolbarProps {
  onNew: () => void;
  onOpen: () => void;
  onSave: () => void;
  onExportSvg: () => void;
  onExamples: () => void;
  canExport: boolean;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onHelp: () => void;
}

const buttonClass = 'btn btn-ghost btn-sm gap-1 font-normal';

const Toolbar: FC<ToolbarProps> = ({
  onNew,
  onOpen,
  onSave,
  onExportSvg,
  onExamples,
  canExport,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  theme,
  onToggleTheme,
  onHelp,
}) => (
  <div className="no-print border-base-300 bg-base-200 flex flex-wrap items-center gap-1 border-b px-2 py-1.5">
    <span className="mr-1 text-sm font-semibold tracking-wide">Diagram</span>
    <button className={buttonClass} onClick={onNew}>
      <FiFilePlus /> New
    </button>
    <button className={buttonClass} onClick={onOpen}>
      <FiUpload /> Open
    </button>
    <button className={buttonClass} onClick={onSave}>
      <FiDownload /> Save
    </button>
    <button className={buttonClass} disabled={!canExport} onClick={onExportSvg}>
      <FiImage /> Export SVG
    </button>
    <button
      className={buttonClass}
      onClick={onExamples}
      aria-label="Browse examples"
      title="Browse example diagrams">
      <FiLayout /> Examples
    </button>
    <span className="bg-base-300 mx-1 h-6 w-px" />
    <button className={buttonClass} onClick={onZoomOut} aria-label="Zoom out">
      <FiMinus />
    </button>
    <button
      className="btn btn-ghost btn-sm w-14 font-mono text-xs"
      onClick={onZoomReset}>
      {Math.round(zoom * 100)}%
    </button>
    <button className={buttonClass} onClick={onZoomIn} aria-label="Zoom in">
      <FiPlus />
    </button>
    <button
      className={buttonClass}
      onClick={onZoomReset}
      aria-label="Reset zoom">
      <FiMaximize />
    </button>
    <span className="bg-base-300 mx-1 h-6 w-px" />
    <button
      className={buttonClass}
      onClick={onToggleTheme}
      title="Toggle theme"
      aria-label="Toggle theme">
      {theme === 'dark' ? <FiSun /> : <FiMoon />}
    </button>
    <button className={buttonClass} onClick={onHelp} aria-label="Help">
      <FiHelpCircle />
    </button>
  </div>
);

export default Toolbar;
