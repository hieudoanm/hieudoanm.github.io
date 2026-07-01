import { FC } from 'react';

export interface Action {
  label: string;
  url: string;
}

export interface ItemCardProps {
  label: string;
  href: string;
  emoji: string;
  description?: string;
  badge?: string;
  actions?: Action[];
}

export const ItemCard: FC<ItemCardProps> = ({
  label,
  href,
  emoji,
  description,
  badge,
  actions,
}) => (
  <div className="card bg-base-200 border-base-300 hover:bg-base-300 group relative w-full border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg">
    <a href={href} rel="noopener noreferrer" className="block">
      {badge && (
        <span className="bg-primary/20 text-primary border-primary/30 absolute -top-2 right-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] leading-none font-bold tracking-widest uppercase">
          {badge}
        </span>
      )}
      <div className="card-body flex-col items-center justify-center gap-2 p-4 text-center">
        <div className="bg-primary/20 border-primary/30 flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-inner transition-transform duration-300 group-hover:scale-110">
          <span>{emoji}</span>
        </div>
        <div>
          <div className="truncate text-sm font-normal tracking-tight">
            {label}
          </div>
          <div className="text-base-content/40 mt-0.5 truncate text-[10px] tracking-widest uppercase">
            {description ?? label}
          </div>
        </div>
        {(actions ?? [{ label: 'Open in new tab', url: href }]).map(
          (action, i) => (
            <button
              key={`${action.url}-${i}`}
              type="button"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(action.url, '_blank', 'noopener,noreferrer');
              }}
              className="btn btn-primary btn-xs w-full no-underline transition-all"
              aria-label={`Open ${label} in new tab`}>
              {action.label}
            </button>
          )
        )}
      </div>
    </a>
  </div>
);

ItemCard.displayName = 'ItemCard';
