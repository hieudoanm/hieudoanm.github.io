'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import {
  FiBookOpen,
  FiChevronDown,
  FiCopy,
  FiDownload,
  FiFilePlus,
  FiHelpCircle,
  FiImage,
  FiLayout,
  FiMaximize,
  FiMinus,
  FiMoon,
  FiPlus,
  FiRotateCcw,
  FiRotateCw,
  FiSun,
  FiType,
  FiUpload,
} from 'react-icons/fi';
import type { Theme } from '@/hooks/useTheme';
import type { LayoutDirection, NodeShape, SnippetFormat } from '@/lib/types';

interface ToolbarProps {
  onNew: () => void;
  onOpen: () => void;
  onSave: () => void;
  onExportSvg: () => void;
  onExportSvgPrint: () => void;
  onExportPng: () => void;
  onCopySnippet: (format: SnippetFormat) => void;
  onExamples: () => void;
  canExport: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomReset: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onHelp: () => void;
  direction: LayoutDirection;
  onDirectionChange: (direction: LayoutDirection) => void;
  onNewShape: (shape: NodeShape) => void;
}

type MenuName = 'layout' | 'shape' | 'export' | 'copy' | null;

const buttonClass = 'btn btn-ghost btn-sm gap-1 font-normal';
const iconClass = 'size-4';

const SHAPES: readonly { shape: NodeShape; label: string }[] = [
  { shape: 'rect', label: 'Rectangle' },
  { shape: 'round', label: 'Rounded' },
  { shape: 'ellipse', label: 'Ellipse' },
  { shape: 'diamond', label: 'Diamond' },
  { shape: 'hexagon', label: 'Hexagon' },
  { shape: 'parallelogram', label: 'Parallelogram' },
  { shape: 'cylinder', label: 'Cylinder' },
  { shape: 'cloud', label: 'Cloud' },
  { shape: 'note', label: 'Note' },
  { shape: 'actor', label: 'Actor' },
];

const Toolbar: FC<ToolbarProps> = ({
  onNew,
  onOpen,
  onSave,
  onExportSvg,
  onExportSvgPrint,
  onExportPng,
  onCopySnippet,
  onExamples,
  canExport,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  zoom,
  onZoomIn,
  onZoomOut,
  onZoomReset,
  theme,
  onToggleTheme,
  onHelp,
  direction,
  onDirectionChange,
  onNewShape,
}) => {
  const [menu, setMenu] = useState<MenuName>(null);
  const toggle = (name: Exclude<MenuName, null>): void =>
    setMenu((current) => (current === name ? null : name));

  const menuClass =
    'dropdown-content menu bg-base-200 z-20 mt-1 w-48 rounded-box p-2 shadow';
  const menuItem =
    (action: () => void): (() => void) =>
    () => {
      setMenu(null);
      action();
    };

  return (
    <div className="no-print border-base-300 bg-base-200 flex flex-wrap items-center gap-1 border-b px-2 py-1.5">
      <span className="mr-1 text-sm font-semibold tracking-wide">Diagram</span>
      <button className={buttonClass} onClick={onNew}>
        <FiFilePlus className={iconClass} /> New
      </button>
      <button className={buttonClass} onClick={onOpen}>
        <FiUpload className={iconClass} /> Open
      </button>
      <button className={buttonClass} onClick={onSave}>
        <FiDownload className={iconClass} /> Save
      </button>
      <button
        className={buttonClass}
        disabled={!canExport}
        onClick={onExportSvg}>
        <FiImage className={iconClass} /> Export SVG
      </button>
      <div className="dropdown">
        <button
          aria-label="More export options"
          className={buttonClass}
          onClick={() => toggle('export')}>
          <FiChevronDown className="size-3" />
        </button>
        {menu === 'export' && (
          <ul className={menuClass} tabIndex={-1}>
            <li>
              <button
                disabled={!canExport}
                onClick={menuItem(onExportSvgPrint)}>
                SVG (A4 print)
              </button>
            </li>
            <li>
              <button disabled={!canExport} onClick={menuItem(onExportPng)}>
                PNG
              </button>
            </li>
          </ul>
        )}
      </div>
      <button
        className={buttonClass}
        onClick={onExamples}
        aria-label="Browse examples"
        title="Browse example diagrams">
        <FiLayout className={iconClass} /> Examples
      </button>
      <a
        className={buttonClass}
        href="/posts/"
        title="Browse the example library">
        <FiBookOpen className={iconClass} /> Posts
      </a>
      <span className="bg-base-300 mx-1 h-6 w-px" />
      <button
        className={buttonClass}
        disabled={!canUndo}
        onClick={onUndo}
        aria-label="Undo"
        title="Undo (Ctrl+Z)">
        <FiRotateCcw className={iconClass} />
      </button>
      <button
        className={buttonClass}
        disabled={!canRedo}
        onClick={onRedo}
        aria-label="Redo"
        title="Redo (Ctrl+Y)">
        <FiRotateCw className={iconClass} />
      </button>
      <span className="bg-base-300 mx-1 h-6 w-px" />
      <button className={buttonClass} onClick={onZoomOut} aria-label="Zoom out">
        <FiMinus className={iconClass} />
      </button>
      <button
        className="btn btn-ghost btn-sm w-14 font-mono text-xs"
        onClick={onZoomReset}>
        {Math.round(zoom * 100)}%
      </button>
      <button className={buttonClass} onClick={onZoomIn} aria-label="Zoom in">
        <FiPlus className={iconClass} />
      </button>
      <button
        className={buttonClass}
        onClick={onZoomReset}
        aria-label="Reset zoom">
        <FiMaximize className={iconClass} />
      </button>
      <span className="bg-base-300 mx-1 h-6 w-px" />
      <div className="dropdown">
        <button
          aria-label="Layout"
          className={buttonClass}
          onClick={() => toggle('layout')}>
          <FiLayout className={iconClass} />
          {direction === 'horizontal' ? 'Left → Right' : 'Top → Bottom'}
          <FiChevronDown className="size-3" />
        </button>
        {menu === 'layout' && (
          <ul className={menuClass} tabIndex={-1}>
            <li>
              <button onClick={menuItem(() => onDirectionChange('horizontal'))}>
                Left → Right
              </button>
            </li>
            <li>
              <button onClick={menuItem(() => onDirectionChange('vertical'))}>
                Top → Bottom
              </button>
            </li>
          </ul>
        )}
      </div>
      <div className="dropdown">
        <button
          aria-label="Shape"
          className={buttonClass}
          onClick={() => toggle('shape')}>
          <FiType className={iconClass} />
          Shape
          <FiChevronDown className="size-3" />
        </button>
        {menu === 'shape' && (
          <ul className={menuClass} tabIndex={-1}>
            {SHAPES.map(({ shape, label }) => (
              <li key={shape}>
                <button onClick={menuItem(() => onNewShape(shape))}>
                  {label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="dropdown">
        <button
          aria-label="Copy"
          className={buttonClass}
          onClick={() => toggle('copy')}>
          <FiCopy className={iconClass} />
          Copy
          <FiChevronDown className="size-3" />
        </button>
        {menu === 'copy' && (
          <ul className={menuClass} tabIndex={-1}>
            <li>
              <button
                disabled={!canExport}
                onClick={menuItem(() => onCopySnippet('markdown'))}>
                Markdown
              </button>
            </li>
            <li>
              <button
                disabled={!canExport}
                onClick={menuItem(() => onCopySnippet('mermaid'))}>
                Mermaid
              </button>
            </li>
            <li>
              <button
                disabled={!canExport}
                onClick={menuItem(() => onCopySnippet('plantuml'))}>
                PlantUML
              </button>
            </li>
          </ul>
        )}
      </div>
      <span className="bg-base-300 mx-1 h-6 w-px" />
      <button
        className={buttonClass}
        onClick={onToggleTheme}
        title="Toggle theme"
        aria-label="Toggle theme">
        {theme === 'dark' ? (
          <FiSun className={iconClass} />
        ) : (
          <FiMoon className={iconClass} />
        )}
      </button>
      <button className={buttonClass} onClick={onHelp} aria-label="Help">
        <FiHelpCircle className={iconClass} />
      </button>
      <Link href="/downloads" className={buttonClass} aria-label="Downloads">
        <FiDownload className={iconClass} />
        Downloads
      </Link>
    </div>
  );
};

export default Toolbar;
