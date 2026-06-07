import { FC } from 'react';

export interface LinkCardProps {
  href: string;
  label: string;
  emoji: string;
  description?: string;
  color?: string;
  badge?: string;
}

export const LinkCard: FC<LinkCardProps> = ({
  href,
  label,
  emoji,
  description,
  color,
  badge,
}) => (
  <div
    className="card bg-base-200 border-base-300 hover:bg-base-300 group relative w-full border text-left transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
    style={
      color ? ({ '--ai-color': color } as React.CSSProperties) : undefined
    }>
    <a href={href} rel="noopener noreferrer" className="block">
      {badge && (
        <span
          className="absolute -top-2 right-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] leading-none font-bold tracking-widest uppercase"
          style={
            color
              ? {
                  background: `${color}22`,
                  color,
                  border: `1px solid ${color}44`,
                }
              : undefined
          }>
          {badge}
        </span>
      )}
      <div className="card-body flex-col items-center justify-center gap-2 p-4 text-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl shadow-inner transition-transform duration-300 group-hover:scale-110${color ? '' : 'bg-neutral border-primary-content border'}`}
          style={
            color
              ? { background: `${color}22`, border: `1.5px solid ${color}44` }
              : undefined
          }>
          <span>{emoji}</span>
        </div>
        <div>
          <div className="truncate text-sm font-bold tracking-tight">
            {label}
          </div>
          <div className="text-base-content/40 mt-0.5 truncate text-[10px] tracking-widest uppercase">
            {description ?? label}
          </div>
        </div>
        <button
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            window.open(href, '_blank', 'noopener,noreferrer');
          }}
          className="btn btn-primary btn-xs w-full no-underline transition-all"
          aria-label={`Open ${label} in new tab`}>
          Open in new tab
        </button>
      </div>
    </a>
  </div>
);
