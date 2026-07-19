'use client';

import { FC } from 'react';

interface StatusBarProps {
  activeLabel: string;
  rangeLabel: string;
  sheetName: string;
  gridSize: { rows: number; cols: number };
}

const StatusBar: FC<StatusBarProps> = ({
  activeLabel,
  rangeLabel,
  sheetName,
  gridSize,
}) => (
  <div className="flex items-center justify-between border-t border-base-300 bg-base-200 px-3 py-1 font-mono text-xs text-base-content/80">
    <div className="flex items-center gap-3">
      <span aria-label="Active cell">{activeLabel}</span>
      {rangeLabel !== activeLabel && <span>{rangeLabel}</span>}
    </div>
    <div className="flex items-center gap-3">
      <span>{sheetName}</span>
      <span aria-label="Grid size">
        {gridSize.rows} rows x {gridSize.cols} columns
      </span>
    </div>
  </div>
);

export default StatusBar;
