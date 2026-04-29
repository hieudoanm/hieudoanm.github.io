import { FC } from 'react';

export interface BookmarkItem {
  label: string;
  url: string;
  description: string;
  emoji: string;
  color: string;
  badge?: string;
}

export const BookmarkCard: FC<BookmarkItem> = ({
  label,
  url,
  description,
  emoji,
  color,
  badge,
}) => (
  <a
    href={url}
    rel="noopener noreferrer"
    className="card bg-base-200 border-base-300 hover:bg-base-300 group relative border transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
    style={{ '--ai-color': color } as React.CSSProperties}>
    {badge && (
      <span
        className="absolute -top-2 right-0 rounded-full px-1.5 py-0.5 font-mono text-[9px] leading-none font-bold tracking-widest uppercase"
        style={{
          background: `${color}22`,
          color,
          border: `1px solid ${color}44`,
        }}>
        {badge}
      </span>
    )}
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
  </a>
);
