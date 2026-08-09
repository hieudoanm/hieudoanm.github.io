'use client';

import type { FC, ReactNode } from 'react';
import { LuFileDown, LuPrinter, LuTriangleAlert } from 'react-icons/lu';
import { PAPER_SIZES } from '../../../data/paper';
import { DENSITY_ZOOM, RESUME_DENSITIES } from '../../../types/resume';
import type { ResumeOptions } from '../../../types/resume';
import { ZoomControls } from './ZoomControls';

interface PreviewToolbarProps {
  paperId: string;
  density: ResumeOptions['density'];
  accentColor: string;
  scale: number;
  zoom: number;
  overflows: boolean;
  onPaperChange: (id: string) => void;
  onDensityChange: (density: ResumeOptions['density']) => void;
  onAccentChange: (color: string) => void;
  onZoomChange: (zoom: number) => void;
  onDownload: () => void;
  onPrint: () => void;
}

const GroupLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="text-base-content/50 text-[10px] font-bold tracking-wider uppercase">
    {children}
  </span>
);

export const PreviewToolbar: FC<PreviewToolbarProps> = ({
  paperId,
  density,
  accentColor,
  scale,
  zoom,
  overflows,
  onPaperChange,
  onDensityChange,
  onAccentChange,
  onZoomChange,
  onDownload,
  onPrint,
}) => (
  <div className="bg-base-100 border-base-300 border-b px-4 py-2">
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <GroupLabel>Document</GroupLabel>
      <select
        className="select select-sm select-bordered"
        value={paperId}
        onChange={(event) => onPaperChange(event.target.value)}
        aria-label="Paper size">
        {PAPER_SIZES.map((size) => (
          <option key={size.id} value={size.id}>
            {size.label} · {size.widthMm} × {size.heightMm} mm
          </option>
        ))}
      </select>

      <select
        className="select select-sm select-bordered"
        value={density}
        onChange={(event) =>
          onDensityChange(event.target.value as ResumeOptions['density'])
        }
        aria-label="Text density">
        {RESUME_DENSITIES.map((density) => (
          <option key={density} value={density}>
            {density[0].toUpperCase() + density.slice(1)} ·{' '}
            {Math.round(DENSITY_ZOOM[density] * 100)}%
          </option>
        ))}
      </select>

      <label className="inline-flex items-center gap-1 text-xs">
        <input
          type="color"
          className="border-base-300 h-7 w-9 cursor-pointer rounded border bg-transparent"
          value={accentColor || '#334155'}
          aria-label="Accent color"
          onChange={(event) => onAccentChange(event.target.value)}
        />
        Accent
      </label>

      {overflows && (
        <span className="text-warning ml-auto inline-flex items-center gap-1 text-xs">
          <LuTriangleAlert />
          Overflows the page
        </span>
      )}
    </div>

    <div className="border-base-200 mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t pt-1.5">
      <GroupLabel>View</GroupLabel>
      <ZoomControls scale={scale} zoom={zoom} onZoomChange={onZoomChange} />

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          className="btn btn-neutral btn-sm"
          onClick={onDownload}>
          <LuFileDown />
          HTML
        </button>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={onPrint}>
          <LuPrinter />
          Print / PDF
        </button>
      </div>
    </div>
  </div>
);

PreviewToolbar.displayName = 'PreviewToolbar';
