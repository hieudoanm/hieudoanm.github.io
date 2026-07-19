import type { FC } from 'react';
import { FiAnchor, FiGrid } from 'react-icons/fi';

export interface GuideControlsProps {
  snapEnabled: boolean;
  gridVisible: boolean;
  onToggleSnap: (enabled: boolean) => void;
  onToggleGrid: (visible: boolean) => void;
}

export const GuideControls: FC<GuideControlsProps> = ({
  snapEnabled,
  gridVisible,
  onToggleSnap,
  onToggleGrid,
}) => (
  <div
    className="flex items-center gap-1"
    role="group"
    aria-label="Drawing guides">
    <button
      type="button"
      aria-pressed={snapEnabled}
      aria-label="Snap to vertices"
      className={`btn btn-square min-h-11 min-w-11 ${snapEnabled ? 'btn-primary' : 'btn-ghost'}`}
      onClick={() => onToggleSnap(!snapEnabled)}>
      <FiAnchor className="text-lg" />
    </button>
    <button
      type="button"
      aria-pressed={gridVisible}
      aria-label="Guide grid"
      className={`btn btn-square min-h-11 min-w-11 ${gridVisible ? 'btn-primary' : 'btn-ghost'}`}
      onClick={() => onToggleGrid(!gridVisible)}>
      <FiGrid className="text-lg" />
    </button>
  </div>
);
