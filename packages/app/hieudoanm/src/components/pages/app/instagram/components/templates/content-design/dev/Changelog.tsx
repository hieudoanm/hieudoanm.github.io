import type { FC } from 'react';
import type { TemplateProps } from '../../common';

interface Change {
  type: string;
  description: string;
}

const TYPE_COLORS: Record<string, string> = {
  added: 'bg-success/20 text-success',
  fixed: 'bg-info/20 text-info',
  changed: 'bg-warning/20 text-warning',
  removed: 'bg-error/20 text-error',
};

export const Changelog: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? 'Changelog';
  const version = (data.version as string) ?? '0.0.0';
  const date = (data.date as string) ?? '';
  const changes = (data.changes as Change[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-8">
      <div className="mb-2 text-center">
        <div className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">
          Changelog
        </div>
        <div className="bg-primary text-base-100 mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold">
          v{version}
        </div>
        {date && <div className="text-neutral mt-1 text-[10px]">{date}</div>}
      </div>
      <div className="text-base-content mb-2 text-center text-sm font-bold">
        {title}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        {changes.map((change, i) => {
          const color =
            TYPE_COLORS[change.type.toLowerCase()] ??
            'bg-neutral/20 text-neutral';
          return (
            <div key={i} className="flex items-start gap-1">
              <span
                className={`${color} w-14 shrink-0 rounded px-1.5 py-0.5 text-center text-[9px] font-bold uppercase`}>
                {change.type}
              </span>
              <span className="text-base-content text-[10px]">
                {change.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Changelog.displayName = 'Changelog';
