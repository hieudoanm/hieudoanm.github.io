'use client';

import type { FC } from 'react';
import { LuMaximize, LuMinus, LuPlus } from 'react-icons/lu';
import { clampZoom } from '../../../hooks/usePreviewScale';

interface ZoomControlsProps {
  scale: number;
  zoom: number;
  onZoomChange: (zoom: number) => void;
}

export const ZoomControls: FC<ZoomControlsProps> = ({
  scale,
  zoom,
  onZoomChange,
}) => (
  <>
    <div className="join">
      <button
        type="button"
        className="btn btn-sm join-item"
        onClick={() => onZoomChange(clampZoom(zoom - 0.1))}
        aria-label="Zoom out">
        <LuMinus />
      </button>
      <button
        type="button"
        className="btn btn-sm join-item"
        onClick={() => onZoomChange(1)}
        aria-label="Reset zoom">
        <LuMaximize />
      </button>
      <button
        type="button"
        className="btn btn-sm join-item"
        onClick={() => onZoomChange(clampZoom(zoom + 0.1))}
        aria-label="Zoom in">
        <LuPlus />
      </button>
    </div>
    <span className="text-base-content/50 text-xs">
      {Math.round(scale * 100)}%
    </span>
  </>
);

ZoomControls.displayName = 'ZoomControls';
