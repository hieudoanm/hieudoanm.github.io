import { FC } from 'react';

export interface Tool {
  label: string;
  description: string;
  emoji: string;
  color: string;
  onClick: () => void;
}

export const ToolCard: FC<Tool> = ({
  label,
  description,
  emoji,
  color,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="card bg-base-200 border-base-300 hover:bg-base-300 group w-full border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
    <div className="card-body flex-col items-center justify-center gap-2 p-4 text-center">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-inner transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}22`, border: `1.5px solid ${color}44` }}>
        <span>{emoji}</span>
      </div>
      <div>
        <div className="text-sm font-bold tracking-tight">{label}</div>
        <div className="text-base-content/40 mt-0.5 text-[10px] tracking-widest uppercase">
          {description}
        </div>
      </div>
    </div>
  </button>
);
