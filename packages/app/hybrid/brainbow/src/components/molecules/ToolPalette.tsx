import type { FC } from 'react';
import {
  FiActivity,
  FiArrowRight,
  FiDelete,
  FiMaximize,
  FiMove,
  FiPenTool,
  FiScissors,
  FiTriangle,
} from 'react-icons/fi';
import type { ViewTool } from '@/types/annotation';

export interface ToolPaletteProps {
  tool: ViewTool;
  onToolChange: (tool: ViewTool) => void;
}

const TOOL_ICONS: Record<ViewTool, FC<{ className?: string }>> = {
  pan: FiMove,
  polygon: FiTriangle,
  freehand: FiPenTool,
  measureDistance: FiArrowRight,
  measureAngle: FiActivity,
  measureArea: FiMaximize,
  erase: FiDelete,
  lassoSubtract: FiScissors,
};

const TOOL_LABELS: Record<ViewTool, string> = {
  pan: 'Pan',
  polygon: 'Polygon',
  freehand: 'Freehand',
  measureDistance: 'Measure distance',
  measureAngle: 'Measure angle',
  measureArea: 'Measure area',
  erase: 'Erase',
  lassoSubtract: 'Lasso subtract',
};

export const ToolPalette: FC<ToolPaletteProps> = ({ tool, onToolChange }) => (
  <div className="flex items-center gap-1" role="group" aria-label="Tools">
    {(Object.keys(TOOL_ICONS) as ViewTool[]).map((id) => {
      const Icon = TOOL_ICONS[id];
      const active = tool === id;
      return (
        <button
          key={id}
          type="button"
          aria-pressed={active}
          aria-label={`${TOOL_LABELS[id]} tool`}
          className={`btn btn-square min-h-11 min-w-11 ${active ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onToolChange(id)}>
          <Icon className="text-lg" />
        </button>
      );
    })}
  </div>
);
