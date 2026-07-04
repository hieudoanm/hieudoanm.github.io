import type { ComponentType, FC } from 'react';

export interface App {
  label: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  tags?: string[];
  onClick: () => void;
}

export const AppCard: FC<App> = ({
  label,
  description,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-base-100 hover:bg-base-300 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors">
      <div className="bg-primary/20 border-primary/30 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm shadow-inner">
        <Icon className="text-sm" size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-normal tracking-tight">
          {label}
        </div>
        <div className="text-base-content/40 truncate text-[10px] tracking-widest uppercase">
          {description}
        </div>
      </div>
    </button>
  );
};
AppCard.displayName = 'AppCard';
