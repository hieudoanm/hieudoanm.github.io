'use client';

import { FC } from 'react';

interface StatusBarProps {
  title: string;
  nodes: number;
  edges: number;
  errors: number;
}

const StatusBar: FC<StatusBarProps> = ({ title, nodes, edges, errors }) => (
  <div className="no-print border-base-300 bg-base-200 text-base-content/70 flex items-center gap-3 border-t px-3 py-1.5 text-xs">
    <span className="text-base-content max-w-64 truncate font-medium">
      {title || 'Untitled diagram'}
    </span>
    <span className="bg-base-300 h-3 w-px" />
    <span aria-label="Node count">{nodes} nodes</span>
    <span aria-label="Edge count">{edges} edges</span>
    <span className="bg-base-300 h-3 w-px" />
    <span className="text-base-content/40">autosaved locally</span>
    {errors > 0 && (
      <span className="text-error ml-auto font-medium">{errors} error(s)</span>
    )}
  </div>
);

export default StatusBar;
