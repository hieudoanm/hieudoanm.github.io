import type { ComponentType, FC } from 'react';

export interface Action {
  label: string;
  url: string;
}

export interface Download {
  id: string;
  label: string;
  url: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  description?: string;
  badge?: string;
  downloads?: Action[];
}

export const DownloadCard: FC<Download> = ({
  label,
  url,
  icon: Icon,
  description,
  badge,
  downloads,
}) => {
  const actions = downloads ?? [{ label: 'Open', url }];

  return (
    <div className="bg-base-100 hover:bg-base-300 group relative flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-w-0 flex-1 items-center gap-3">
        <div className="bg-primary/20 border-primary/30 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm shadow-inner">
          <Icon className="text-sm" size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-normal tracking-tight">
              {label}
            </span>
            {badge && (
              <span className="bg-primary/20 text-primary border-primary/30 shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] leading-none font-bold tracking-widest uppercase">
                {badge}
              </span>
            )}
          </div>
          <div className="text-base-content/40 truncate text-[10px] tracking-widest uppercase">
            {description ?? label}
          </div>
        </div>
      </a>
      <div className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
        {actions.length === 1 ? (
          <button
            type="button"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(actions[0].url, '_blank', 'noopener,noreferrer');
            }}
            className="btn btn-primary btn-xs"
            aria-label={actions[0].label}>
            {actions[0].label}
          </button>
        ) : (
          <select
            className="select select-primary select-xs w-28"
            defaultValue=""
            onChange={(e) => {
              const action = actions[Number(e.target.value)];
              if (action)
                window.open(action.url, '_blank', 'noopener,noreferrer');
              e.target.value = '';
            }}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
            }}>
            <option value="" disabled>
              Download ▾
            </option>
            {actions.map((action, i) => (
              <option key={action.url} value={i}>
                {action.label}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};
DownloadCard.displayName = 'DownloadCard';
