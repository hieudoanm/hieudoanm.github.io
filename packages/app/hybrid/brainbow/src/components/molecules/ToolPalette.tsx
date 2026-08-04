import type { FC } from 'react';
import { FiMove, FiPenTool, FiTriangle } from 'react-icons/fi';
import type { ViewTool } from '@/types/annotation';

export interface ToolPaletteProps {
  tool: ViewTool;
  onToolChange: (tool: ViewTool) => void;
}

const TOOL_ICONS: Record<ViewTool, FC<{ className?: string }>> = {
  pan: FiMove,
  polygon: FiTriangle,
  freehand: FiPenTool,
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
          aria-label={`${id} tool`}
          className={`btn btn-square btn-sm ${active ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onToolChange(id)}>
          <Icon className="text-base" />
        </button>
      );
    })}
  </div>
);
